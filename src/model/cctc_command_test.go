package model

import (
	"strings"
	"testing"
)

func Test_CCTC_Command_GetJsonCommand(t *testing.T) {
	var command = CCTC_Command{"CTCCFRONTEND_CONTROL", "Open", 1, 1, 1, "202002291020", "202002291020", "s", "s"}
	res := command.GetJsonCommand()
	if strings.Index(res, "CTCCFRONTEND_CONTROL") == -1 {
		t.Error("Test_CCTC_Command_GetJsonCommand failure")
	} else {
		t.Log(res)
	}

}
