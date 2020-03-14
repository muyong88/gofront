package routes

import (
	"fmt"
	"testing"

	"github.com/kirinlabs/HttpRequest"
)

func Test_File_state_Get(t *testing.T) {

	urlStr := "http://localhost:8080/non_real/filestate?sendSessionID=sdsd&fileName=abc.txt&filePath=%2Fhome%2Foliver%2F"

	res, _ := HttpRequest.Get(urlStr)
	body, _ := res.Body()
	fmt.Println(string(body))

}
