package model

var MsgChan chan Message


type Message struct {
	Content []byte
	Topic   string
}
