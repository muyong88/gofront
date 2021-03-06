package routes

import (
	"github.com/kataras/golog"

	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

const namespace = "default"

//WebsocketHub WebsocketHub
func WebsocketHub(party iris.Party) {
	controller.WebSocketConn = new(model.WebsocketConnStruct)
	controller.WebSocketConn.Count = 0
	web := party.Party("/echo")
	ws := websocket.New(
		websocket.DefaultGorillaUpgrader,
		serverEvents)
	web.Get("/", websocket.Handler(ws)) // websocket模块
}

// if namespace is empty then simply websocket.Events{...} can be used instead.
var serverEvents = websocket.Namespaces{
	namespace: websocket.Events{
		websocket.OnNamespaceConnected: func(nsConn *websocket.NSConn, msg websocket.Message) error {
			// with `websocket.GetContext` you can retrieve the Iris' `Context`.
			if controller.WebSocketConn.Count == 0 {
				controller.WebSocketConn.ConnServer = nsConn.Conn.Server()
				controller.WebSocketConn.Namespace = msg.Namespace
				controller.WebSocketConn.Room = msg.Room
			}
			controller.WebSocketConn.Count = controller.WebSocketConn.Count + 1
			ctx := websocket.GetContext(nsConn.Conn)
			golog.Infof("[%s] connected to namespace [%s] with IP [%s]",
				nsConn, msg.Namespace,
				ctx.RemoteAddr())
			return nil
		},
		websocket.OnNamespaceDisconnect: func(nsConn *websocket.NSConn, msg websocket.Message) error {
			golog.Errorf("[%s] disconnected from namespace [%s]", nsConn, msg.Namespace)
			//regist_info(nsConn, 0)
			controller.WebSocketConn.Count = controller.WebSocketConn.Count - 1
			return nil
		},
		"communicate": func(nsConn *websocket.NSConn, msg websocket.Message) error {
			// room.String() returns -> NSConn.String() returns -> Conn.String() returns -> Conn.ID()
			golog.Errorf("[%s] sent: %s", nsConn, string(msg.Body))
			golog.Errorf("Server got: %s from [%s]", msg.Body, nsConn.Conn.ID())

			return nil
		},
	},
}
