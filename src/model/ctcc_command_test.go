package model

import (
	"strings"
	"testing"
)

func Test_CTCCCommand_GetJSONCommand(t *testing.T) {
	var command = CTCCCommand{"CTCCFRONTEND_CONTROL", "Open", 1, 1, 1, "202002291020", "202002291020", "s", "s", ""}
	res := command.GetJSONCommand()
	if strings.Index(res, "CTCCFRONTEND_CONTROL") == -1 {
		t.Error("Test_CTCCCommand_GetJSONCommand failure")
	} else {
		t.Log(res)
	}

}
