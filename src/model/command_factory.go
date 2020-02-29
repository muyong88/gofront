package model

type Command interface {
	GetJsonCommand() string
	InitByJson(data []byte) error
}

func GetCommand(c_type string) *Command {
	var command Command
	switch c_type {
	case "CTCCFRONTEND_CONTROL":
		command = new(CCTC_Command)
	case "ProtocalCommand":
		command = new(Protocal_Command)
	case "MCSMES":
		command = new(Non_Real_File_Command)
	}
	return &command
}
