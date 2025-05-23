"use strict";

goog.provide("Blockly.Blocks.jazrobot");
goog.require("Blockly.Blocks");

Blockly.Blocks['jazrobot_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When JazroBot Start");
    this.appendStatementInput("SETUP")
        .setCheck(null)
        .appendField("Setup (runs once)");
    this.appendStatementInput("LOOP")
        .setCheck(null)
        .appendField("Loop (runs forever)");
    this.setColour("#FF6680");
    this.setTooltip("Define code for setup (runs once) and the main loop (runs forever)");
    this.setHelpUrl("");
    this.setDeletable(true);
    this.setMovable(true);
  }
};

Blockly.Blocks['jazrobot_wait'] = {
  init: function() {
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("wait for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Wait for specified number of seconds");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_repeat'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("repeat");
    this.appendDummyInput()
        .appendField("times");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Repeat actions a specified number of times");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_if'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("then");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Do something if condition is true");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_if_else'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("then");
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("else");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Do something if condition is true, otherwise do something else");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_wait_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("wait until");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Wait until condition becomes true");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_repeat_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("repeat until");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Repeat actions until condition becomes true");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("JazroBot Initialize");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Initialize JazroBot motor pins and PWM");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_move_preset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "forward"], 
          ["Backward", "backward"]
        ]), "DIRECTION")
        .appendField("with speed 200");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Move the robot forward or backward with default speed (200)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_move_custom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "forward"], 
          ["Backward", "backward"]
        ]), "DIRECTION");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("with speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Move the robot forward or backward with custom speed (0-255)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_turn_preset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([
          ["Left", "left"], 
          ["Right", "right"]
        ]), "DIRECTION")
        .appendField("with speed 200");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Turn the robot left or right with default speed (200)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_turn_custom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([
          ["Left", "left"], 
          ["Right", "right"]
        ]), "DIRECTION");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("with speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Turn the robot left or right with custom speed (0-255)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_keep_moving'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Keep")
        .appendField(new Blockly.FieldDropdown([
          ["Moving Forward", "forward"],
          ["Moving Backward", "backward"],
          ["Turning Right", "right"],
          ["Turning Left", "left"]
        ]), "DIRECTION");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Keep the robot moving in the specified direction at the given speed");
    this.setHelpUrl("");
  }
};

// New timed movement blocks
Blockly.Blocks['jazrobot_move_timed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "forward"], 
          ["Backward", "backward"]
        ]), "DIRECTION");
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Move the robot forward or backward for a specific time at the given speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_turn_timed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([
          ["Left", "left"], 
          ["Right", "right"]
        ]), "DIRECTION");
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7289DA");
    this.setTooltip("Turn the robot left or right for a specific time at the given speed");
    this.setHelpUrl("");
  }
};

// LED control blocks
Blockly.Blocks['jazrobot_led_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn on")
        .appendField(new Blockly.FieldDropdown([
          ["Green", "green"], 
          ["Red", "red"],
          ["Blue", "blue"]
        ]), "COLOR")
        .appendField("LED");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E67E22");
    this.setTooltip("Turn on LED with specific color");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_led_color_timed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn on")
        .appendField(new Blockly.FieldDropdown([
          ["Green", "green"], 
          ["Red", "red"],
          ["Blue", "blue"]
        ]), "COLOR")
        .appendField("LED for");
    this.appendValueInput("SECONDS")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E67E22");
    this.setTooltip("Turn on LED with specific color for a set time");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_led_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn off LED");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E67E22");
    this.setTooltip("Turn off all LEDs");
    this.setHelpUrl("");
  }
};

// Audio/Buzzer blocks
Blockly.Blocks['jazrobot_play_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play tone with octave")
        .appendField(new Blockly.FieldDropdown([
          ["Very Low (2)", "65.4"], 
          ["Low (3)", "130.8"],
          ["Medium (4)", "261.6"],
          ["High (5)", "523.2"],
          ["Very High (6)", "1046.5"]
        ]), "OCTAVE");
    this.appendDummyInput()
        .appendField("note")
        .appendField(new Blockly.FieldDropdown([
          ["C", "1"], 
          ["C#/Db", "1.059"],
          ["D", "1.122"],
          ["D#/Eb", "1.189"],
          ["E", "1.26"],
          ["F", "1.335"],
          ["F#/Gb", "1.414"],
          ["G", "1.498"],
          ["G#/Ab", "1.587"],
          ["A", "1.682"],
          ["A#/Bb", "1.782"],
          ["B", "1.888"]
        ]), "NOTE");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("duration (ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#9B59B6");
    this.setTooltip("Play a tone at specified octave and note for specified duration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_play_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play note")
        .appendField(new Blockly.FieldDropdown([
          ["C3 (Low C)", "131"],
          ["C4 (Middle C)", "262"],
          ["E4", "330"],
          ["G4", "392"],
          ["C5 (High C)", "523"],
          ["E5", "659"],
          ["G5", "784"],
          ["C6 (Very High C)", "1047"]
        ]), "NOTE");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("duration (ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#9B59B6");
    this.setTooltip("Play a musical note for specified duration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_stop_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop tone");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#9B59B6");
    this.setTooltip("Stop playing any tone");
    this.setHelpUrl("");
  }
};

// RTTTL Music blocks
Blockly.Blocks['jazrobot_play_rtttl'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play song")
        .appendField(new Blockly.FieldDropdown([
          ["Star Wars", "StarWars"], 
          ["Mission Impossible", "MissionImp"],
          ["Super Mario", "SuperMario"],
          ["Pink Panther", "PinkPanther"],
          ["The Entertainer", "Entertainer"],
          ["Take On Me", "TakeOnMe"],
          ["The Muppets", "Muppets"],
          ["Indiana Jones", "Indiana"],
          ["Jingle Bells", "JingleBell"],
          ["Silent Night", "SilentNight"],
          ["Amazing Grace", "AmazingGrace"]
        ]), "SONG");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9B59B6");
    this.setTooltip("Play a selected RTTTL song for a specific duration in milliseconds");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_stop_music'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop music");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9B59B6");
    this.setTooltip("Stop any currently playing RTTTL song");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_buzzer_continuous_on'] = {
  init: function() {
    this.appendValueInput("FREQUENCY")
        .setCheck("Number")
        .appendField("Turn on buzzer (Pin 15) at frequency (Hz)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9B59B6");
    this.setTooltip("Turns the buzzer on Pin 15 on continuously at the specified frequency.");
    this.setHelpUrl("");
  }
};

// Sensor blocks
Blockly.Blocks['jazrobot_ultrasonic_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read ultrasonic distance (cm)");
    this.setOutput(true, "Number");
    this.setColour("#E54B4B");
    this.setTooltip("Reads distance in cm from ultrasonic sensor (Trig=18, Echo=4)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_line_follower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Line sensor")
        .appendField(new Blockly.FieldDropdown([
          ["Left", "33"], 
          ["Right", "36"]
        ]), "SENSOR_PIN")
        .appendField(new Blockly.FieldDropdown([
          ["sees Black", "1"], 
          ["sees White", "0"]
        ]), "DETECT_COLOR");
    this.setOutput(true, "Boolean");
    this.setColour("#E54B4B"); // Sensor category color
    this.setTooltip("Checks if the specified line sensor detects black or white. Left=Pin33, Right=Pin36. Black=1, White=0.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_push_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Push button")
        .appendField(new Blockly.FieldDropdown([
          ["PB1 (Pin 17)", "17"], 
          ["PB2 (Pin 16)", "16"]
        ]), "BUTTON_PIN")
        .appendField("is pressed");
    this.setOutput(true, "Boolean");
    this.setColour("#E54B4B"); // Sensor category color
    this.setTooltip("Checks if the specified push button is pressed (reads LOW). PB1=Pin17, PB2=Pin16.");
    this.setHelpUrl("");
  }
};

// Custom Control Logic/Math Blocks (green color)
Blockly.Blocks['jazrobot_logic_compare'] = {
  init: function() {
    var OPERATORS = [
      ['=', 'EQ'],
      ['\u2260', 'NEQ'], // ≠
      ['<', 'LT'],
      ['\u2264', 'LTE'], // ≤
      ['>', 'GT'],
      ['\u2265', 'GTE'] // ≥
    ];
    this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
    this.setColour("#5CA65C"); // Control category color
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A');
    this.appendValueInput('B').appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        'NEQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
        'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        'LTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
        'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        'GTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
      };
      return TOOLTIPS[op];
    });
    this.prevBlocks_ = [null, null];
  }
  // Add other necessary functions like saveConnections if needed based on standard block
};

Blockly.Blocks['jazrobot_math_number'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
    this.setColour("#5CA65C"); // Control category color
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber('0'), 'NUM'); // Default value 0
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

Blockly.Blocks['jazrobot_logic_boolean'] = {
  init: function() {
    var BOOLEANS = [
      [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
      [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']
    ];
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour("#5CA65C"); // Control category color
    this.setOutput(true, 'Boolean');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['jazrobot_servo_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set servo")
        .appendField(new Blockly.FieldDropdown([
          ["Servo 1 (Pin 2)", "2"], 
          ["Servo 2 (Pin 5)", "5"]
        ]), "SERVO_PIN");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("angle to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#7289DA"); // MOVE category color
    this.setTooltip("Sets the angle of the selected servo (Pin 2 or Pin 5) between 0-180 degrees.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jazrobot_stop_moving'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop moving");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#7289DA"); // MOVE category color
    this.setTooltip("Stops both motors.");
    this.setHelpUrl("");
  }
}; 