package model

import (
	"strings"
	"testing"
)

func Test_Non_Real_File_Command(t *testing.T) {
	var command = NonRealFileCommand{"MCSMES", "", "SJTZ", "WJFS", "", "OIM", "202002291020", ContentFile{"", "", "", "CTCC/BACC"}}
	res := command.GetJSONCommand()
	if strings.Index(res, "MCSMES") == -1 {
		t.Error("Test_Non_Real_File_Command failure")
	} else {
		t.Log(res)
	}

}
