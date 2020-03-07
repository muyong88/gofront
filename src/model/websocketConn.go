package model

import (
	"github.com/kataras/neffos"
)

type WebsocketConnStruct struct {
	ConnServer *neffos.Server
	Namespace  string
	Room       string
	Count      int
}
