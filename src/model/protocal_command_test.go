package model

import (
	"strings"
	"testing"
)

func Test_Protocal_Command(t *testing.T) {
	var command = ProtocalCommand{"ProtocalCommand", 1, "HXC", "00112233", "LINK_CTCC-TL1A1_POAC", 1, "MODE", ParaInfo{"MAIN/BACKUP"}, "LINK"}
	res := command.GetJSONCommand()
	if strings.Index(res, "ProtocalCommand") == -1 {
		t.Error("Test_Protocal_Command failure")
	} else {
		t.Log(res)
	}
}
