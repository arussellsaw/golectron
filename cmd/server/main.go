package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"golang.org/x/net/websocket"
	"stablelib.com/v1/uuid"
)

var messages = make(chan ChannelMessage)

var ci = ChatInstance{
	Title:      "golectron chat",
	activeChan: "general",

	Route: "sidebar",
	Channels: []string{
		"general",
		"random",
	},
	Users: []User{
		User{
			UserName:  "dannycousins",
			FirstName: "Danny",
			LastName:  "Cousins",
			Online:    true,
		},
	},
}

func main() {
	fmt.Println("init server")
	go generateMessages()
	http.Handle("/ws", websocket.Handler(wsHandler))
	log.Fatal(http.ListenAndServe(":5000", nil))
}

func wsHandler(conn *websocket.Conn) {
	fmt.Println("get ws conn")
	defer conn.Close()
	ci.conn = conn
	err := ci.init()
	if err != nil {
		log.Fatal(err)
		return
	}
	ci.updateLoop()
	fmt.Println("close ws conn")
}

type ChatInstance struct {
	conn       *websocket.Conn
	activeChan string

	Route    string   `json:"route"`
	Title    string   `json:"title"`
	Channels []string `json:"channels"`
	Users    []User   `json:"users"`
}

type User struct {
	UserName  string `json:"user_name"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Online    bool
}

func (c *ChatInstance) init() error {
	err := websocket.JSON.Send(c.conn, c)
	return err
}

func (c *ChatInstance) updateLoop() {
	for {
		select {
		case msg := <-messages:
			if msg.Channel == c.activeChan {
				websocket.JSON.Send(c.conn, msg)
			} else {
				fmt.Println("message on inactive context")
			}
		}
	}
}

type ChannelMessage struct {
	Route     string    `json:"route"`
	User      string    `json:"user"`
	Channel   string    `json:"channel"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}

func generateMessages() {
	for _ = range time.Tick(200 * time.Millisecond) {
		chnl := ci.Channels[rand.Intn(2)]
		msg := ChannelMessage{
			Route:     "chat",
			Channel:   chnl,
			User:      "dannycousins",
			Timestamp: time.Now(),
			Content:   uuid.New(),
		}
		messages <- msg
	}
}
