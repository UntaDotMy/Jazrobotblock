"use strict";

goog.provide("Blockly.Blocks.jazrobot");
goog.require("Blockly.Blocks");

Blockly.Blocks['jazrobot_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When JazroBot Start");
    this.appendStatementInput("SETUP")
        .setCheck(null);
    this.setColour("#FF6680");
    this.setTooltip("Code here runs once when JazroBot starts");
    this.setHelpUrl("");
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

Blockly.Blocks['jazrobot_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("forever");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#5CA65C");
    this.setTooltip("Repeat actions forever");
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