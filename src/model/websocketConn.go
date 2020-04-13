package model

import (
	"github.com/kataras/neffos"
)

//WebsocketConnStruct  websocket struct
type WebsocketConnStruct struct {
	ConnServer *neffos.Server
	Namespace  string
	Room       string
	Count      int
}
