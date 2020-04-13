package model

//Command Command接口
type Command interface {
	GetJSONCommand() string
	InitByJSON(data []byte) error
}

//GetCommand 获取命令工厂
func GetCommand(cType string) *Command {
	var command Command
	switch cType {
	case "CTCCFRONTEND_CONTROL":
		command = new(CTCCCommand)
	case "ProtocalCommand":
		command = new(ProtocalCommand)
	case "MCSMES":
		command = new(NonRealFileCommand)
	}
	return &command
}
