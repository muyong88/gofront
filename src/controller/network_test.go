package controller

import "testing"

func TestNetWork(t *testing.T) {
	Init_network("../../config/conf/NetWork.xml")
	Run_network()
	for _, p := range *Producers {
		p.Send("hello, i am a producer")
	}
	t.Log("success!")
}
