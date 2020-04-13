package controller

import (
	"testing"
)

func TestNetWork(t *testing.T) {

	InitNetwork("../../config/conf/NetWork.xml")
	RunNetwork()
	for _, p := range *Producers {
		p.Send("hello, i am a producer")
	}
	t.Log("success!")
}
