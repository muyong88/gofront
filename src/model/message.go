package model

//MsgChan 通道
var MsgChan chan Message

//Message 消息结构体
type Message struct {
	Content []byte
	Topic   string
}
