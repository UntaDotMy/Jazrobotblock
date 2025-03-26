Blockly.Arduino['jazrobot_start'] = function(block) {
  var setupCode = Blockly.Arduino.statementToCode(block, 'SETUP') || '';
  
  // Initialize includes and variables
  Blockly.Arduino.definitions_['define_serial'] = '#include <Arduino.h>';
  
  // Generate setup function
  Blockly.Arduino.setups_['setup_serial'] = '  Serial.begin(115200);';
  if (setupCode) {
    Blockly.Arduino.setups_['setup_custom'] = setupCode;
  }
  
  return '';
};

Blockly.Arduino['jazrobot_wait'] = function(block) {
  var time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '1';
  return 'delay(' + (parseFloat(time) * 1000) + ');\n';
};

Blockly.Arduino['jazrobot_repeat'] = function(block) {
  var times = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = '';
  
  code += 'for (int count = 0; count < ' + times + '; count++) {\n';
  code += branch;
  code += '}\n';
  
  return code;
};

Blockly.Arduino['jazrobot_forever'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = '';
  
  code += 'while (true) {\n';
  code += branch;
  code += '}\n';
  
  return code;
};

Blockly.Arduino['jazrobot_if'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  
  return 'if (' + condition + ') {\n' + branch + '}\n';
};

Blockly.Arduino['jazrobot_if_else'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var elseBranch = Blockly.Arduino.statementToCode(block, 'ELSE');
  
  return 'if (' + condition + ') {\n' + branch + '} else {\n' + elseBranch + '}\n';
};

Blockly.Arduino['jazrobot_wait_until'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
  
  return 'while (!(' + condition + ')) {\n  delay(1);\n}\n';
};

Blockly.Arduino['jazrobot_repeat_until'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  
  return 'while (!(' + condition + ')) {\n' + branch + '}\n';
};

Blockly.Arduino['jazrobot_init'] = function(block) {
  var code = '// Initialize JazroBot\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n';
  return code;
};

Blockly.Arduino['jazrobot_move_preset'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'forward') {
    code += '// Move forward\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'backward') {
    code += '// Move backward\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_move_custom'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'forward') {
    code += '// Move forward with custom speed\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'backward') {
    code += '// Move backward with custom speed\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_turn_preset'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'right') {
    code += '// Turn right\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'left') {
    code += '// Turn left\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'ledcWrite(0, 200);\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_turn_custom'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'right') {
    code += '// Turn right with custom speed\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'left') {
    code += '// Turn left with custom speed\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_keep_moving'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  // Put initialization code in setup
  Blockly.Arduino.setups_['setup_pwm'] = '  // Initialize PWM\n' +
    '  ledcSetup(0, 5000, 8);\n' +
    '  ledcAttachPin(13, 0);\n' +
    '  ledcSetup(0, 5000, 8);\n' +
    '  ledcAttachPin(27, 0);\n';
  
  var code = '';
  
  if (direction === 'forward') {
    code += '// Keep moving forward\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'backward') {
    code += '// Keep moving backward\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  } else if (direction === 'right') {
    code += '// Keep turning right\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
  } else if (direction === 'left') {
    code += '// Keep turning left\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
  }
  
  return code;
};

// New generators for timed movement blocks
Blockly.Arduino['jazrobot_move_timed'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'forward') {
    code += '// Move forward with timed duration\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Stop after specified time\n';
    code += 'ledcWrite(0, 0);\n';
    code += 'ledcWrite(0, 0);\n';
  } else if (direction === 'backward') {
    code += '// Move backward with timed duration\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Stop after specified time\n';
    code += 'ledcWrite(0, 0);\n';
    code += 'ledcWrite(0, 0);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_turn_timed'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = '';
  
  // Add initialization code
  code += '// Initialize PWM\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(13, 0);\n';
  code += 'ledcSetup(0, 5000, 8);\n';
  code += 'ledcAttachPin(27, 0);\n\n';
  
  if (direction === 'right') {
    code += '// Turn right with timed duration\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 0);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 1);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 1);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 0);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Stop after specified time\n';
    code += 'ledcWrite(0, 0);\n';
    code += 'ledcWrite(0, 0);\n';
  } else if (direction === 'left') {
    code += '// Turn left with timed duration\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'ledcWrite(0, ' + speed + ');\n';
    code += 'pinMode(12, OUTPUT);\n';
    code += 'digitalWrite(12, 1);\n';
    code += 'pinMode(14, OUTPUT);\n';
    code += 'digitalWrite(14, 0);\n';
    code += 'pinMode(26, OUTPUT);\n';
    code += 'digitalWrite(26, 0);\n';
    code += 'pinMode(25, OUTPUT);\n';
    code += 'digitalWrite(25, 1);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Stop after specified time\n';
    code += 'ledcWrite(0, 0);\n';
    code += 'ledcWrite(0, 0);\n';
  }
  
  return code;
}; 