Blockly.Arduino['jazrobot_start'] = function(block) {
  // Ensure Arduino.h is included first
  Blockly.Arduino.definitions_['define_arduino_h'] = '#include <Arduino.h>';

  // Process SETUP input for void setup()
  var setupCode = Blockly.Arduino.statementToCode(block, 'SETUP') || '';
  Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(115200);'; // Ensure Serial is always set up
  if (setupCode) {
    // Add user's setup code AFTER basic setup like Serial
    Blockly.Arduino.setups_['setup_custom'] = setupCode;
  }

  // Process LOOP input for void loop()
  var loopCode = Blockly.Arduino.statementToCode(block, 'LOOP') || '';
  
  // Return the loop code. The ArduBlock system wraps this in void loop() { ... }
  return loopCode;
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
  // Ensure all setups are added if this block is used standalone
  Blockly.Arduino.setups_['setup_pwm'] = '  // Initialize PWM\n' + 
    '  ledcSetup(0, 5000, 8); ledcAttachPin(13, 0);\n' + 
    '  ledcSetup(1, 5000, 8); ledcAttachPin(27, 1);\n'; 
  Blockly.Arduino.setups_['setup_motor_pins'] = '  // Setup Motor Driver Pins\n' +
    '  pinMode(12, OUTPUT); pinMode(14, OUTPUT);\n' +
    '  pinMode(26, OUTPUT); pinMode(25, OUTPUT);\n';
  return '// JazroBot Initialized (PWM & Motor Pins Setup)\n';
};

// Function to ensure motor pin setup is added
function ensureMotorPinSetup() {
  // Check if already defined to avoid duplicate setup code
  if (!Blockly.Arduino.setups_['setup_motor_pins']) {
      Blockly.Arduino.setups_['setup_motor_pins'] = '  // Setup Motor Driver Pins\n' +
        '  pinMode(12, OUTPUT); pinMode(14, OUTPUT);\n' +
        '  pinMode(26, OUTPUT); pinMode(25, OUTPUT);\n';
  }
}

// Function to ensure PWM setup is added
function ensurePwmSetup() {
  // Check if already defined
  if (!Blockly.Arduino.setups_['setup_pwm']) {
      Blockly.Arduino.setups_['setup_pwm'] = '  // Initialize PWM\n' + 
        '  ledcSetup(0, 5000, 8); ledcAttachPin(13, 0);\n' + 
        '  ledcSetup(1, 5000, 8); ledcAttachPin(27, 1);\n'; 
   }
}

Blockly.Arduino['jazrobot_move_preset'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';

  if (direction === 'forward') {
    code += '// Move forward\n';
    code += 'ledcWrite(0, 200); ledcWrite(1, 200);\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; 
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; 
  } else if (direction === 'backward') {
    code += '// Move backward\n';
    code += 'ledcWrite(0, 200); ledcWrite(1, 200);\n'; 
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; 
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; 
  }
  return code;
};

Blockly.Arduino['jazrobot_move_custom'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';

  if (direction === 'forward') {
    code += '// Move forward with custom speed\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; 
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; 
  } else if (direction === 'backward') {
    code += '// Move backward with custom speed\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; 
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; 
  }
  return code;
};

Blockly.Arduino['jazrobot_turn_preset'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';

  if (direction === 'right') {
    code += '// Turn right\n';
    code += 'ledcWrite(0, 200); ledcWrite(1, 200);\n'; 
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; // Motor A backwards
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; // Motor B forwards
  } else if (direction === 'left') {
    code += '// Turn left\n';
    code += 'ledcWrite(0, 200); ledcWrite(1, 200);\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; // Motor A forwards
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; // Motor B backwards
  }
  return code;
};

Blockly.Arduino['jazrobot_turn_custom'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';
  
  if (direction === 'right') {
    code += '// Turn right with custom speed\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; 
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; 
  } else if (direction === 'left') {
    code += '// Turn left with custom speed\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; 
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; 
  }
  return code;
};

Blockly.Arduino['jazrobot_keep_moving'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';
  
  if (direction === 'forward') {
    code += '// Keep moving forward\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n';
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n';
  } else if (direction === 'backward') {
    code += '// Keep moving backward\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n';
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n';
  } else if (direction === 'right') {
    code += '// Keep turning right\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n';
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n';
  } else if (direction === 'left') {
    code += '// Keep turning left\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n';
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n';
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n';
  }
  return code;
};

// New generators for timed movement blocks
Blockly.Arduino['jazrobot_move_timed'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';
  
  // Define stop function 
  var stopFuncName = 'jazrobot_stop_motors';
  if (!Blockly.Arduino.definitions_[stopFuncName]) {
      var stopFunctionCode = 
        'void ' + stopFuncName + '() {\n' +
        '  ledcWrite(0, 0); ledcWrite(1, 0);\n' + // Stop both motors
        '}\n';
      Blockly.Arduino.definitions_[stopFuncName] = stopFunctionCode;
  }

  if (direction === 'forward') {
    code += '// Move forward with timed duration\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; 
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; 
  } else if (direction === 'backward') {
    code += '// Move backward with timed duration\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; 
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; 
  }
  code += 'delay(' + seconds + ' * 1000);\n';
  code += stopFuncName + '(); // Stop after specified time\n';
  return code;
};

Blockly.Arduino['jazrobot_turn_timed'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  ensurePwmSetup();
  ensureMotorPinSetup();
  var code = '';
    
  // Define stop function 
  var stopFuncName = 'jazrobot_stop_motors';
  if (!Blockly.Arduino.definitions_[stopFuncName]) {
      var stopFunctionCode = 
        'void ' + stopFuncName + '() {\n' +
        '  ledcWrite(0, 0); ledcWrite(1, 0);\n' + 
        '}\n';
      Blockly.Arduino.definitions_[stopFuncName] = stopFunctionCode;
  }

  if (direction === 'right') {
    code += '// Turn right with timed duration\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 0); digitalWrite(14, 1);\n'; 
    code += 'digitalWrite(26, 1); digitalWrite(25, 0);\n'; 
  } else if (direction === 'left') {
    code += '// Turn left with timed duration\n';
    code += 'ledcWrite(0, ' + speed + '); ledcWrite(1, ' + speed + ');\n'; 
    code += 'digitalWrite(12, 1); digitalWrite(14, 0);\n'; 
    code += 'digitalWrite(26, 0); digitalWrite(25, 1);\n'; 
  }
  code += 'delay(' + seconds + ' * 1000);\n';
  code += stopFuncName + '(); // Stop after specified time\n';
  return code;
};

// LED control code generators
Blockly.Arduino['jazrobot_led_color'] = function(block) {
  var color = block.getFieldValue('COLOR');
  var code = '';
  
  if (color === 'green') {
    code += '// Turn on Green LED\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 0);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
  } else if (color === 'red') {
    code += '// Turn on Red LED\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 0);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
  } else if (color === 'blue') {
    code += '// Turn on Blue LED\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 0);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_led_color_timed'] = function(block) {
  var color = block.getFieldValue('COLOR');
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = '';
  
  if (color === 'green') {
    code += '// Turn on Green LED with timed duration\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 0);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Turn off LED after specified time\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
  } else if (color === 'red') {
    code += '// Turn on Red LED with timed duration\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 0);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Turn off LED after specified time\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
  } else if (color === 'blue') {
    code += '// Turn on Blue LED with timed duration\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 0);\n';
    code += 'delay(' + seconds + ' * 1000);\n';
    code += '// Turn off LED after specified time\n';
    code += 'pinMode(2, OUTPUT);\n';
    code += 'digitalWrite(2, 1);\n';
    code += 'pinMode(23, OUTPUT);\n';
    code += 'digitalWrite(23, 1);\n';
    code += 'pinMode(19, OUTPUT);\n';
    code += 'digitalWrite(19, 1);\n';
  }
  
  return code;
};

Blockly.Arduino['jazrobot_led_off'] = function(block) {
  var code = '';
  
  code += '// Turn off all LEDs\n';
  code += 'pinMode(2, OUTPUT);\n';
  code += 'digitalWrite(2, 1);\n';
  code += 'pinMode(23, OUTPUT);\n';
  code += 'digitalWrite(23, 1);\n';
  code += 'pinMode(19, OUTPUT);\n';
  code += 'digitalWrite(19, 1);\n';
  
  return code;
};

// Audio/Buzzer code generators
Blockly.Arduino['jazrobot_play_tone'] = function(block) {
  var octaveBase = parseFloat(block.getFieldValue('OCTAVE')) || 261.6; // Default to middle C (C4)
  var noteMultiplier = parseFloat(block.getFieldValue('NOTE')) || 1;  // Default to C
  var frequency = Math.round(octaveBase * noteMultiplier);
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '500';
  var code = '';
  
  // Add tone library include
  Blockly.Arduino.definitions_['define_tone32'] = '#include <Tone32.h>';
  Blockly.Arduino.definitions_['define_buzzer_channel'] = '#define BUZZER_CHANNEL 0';
  
  code += '// Play tone with octave and note\n';
  code += '// Calculated frequency: ' + frequency + ' Hz\n';
  code += 'tone(15, ' + frequency + ', ' + duration + ', BUZZER_CHANNEL);\n';
  code += 'delay(' + duration + ');\n';
  
  return code;
};

Blockly.Arduino['jazrobot_play_note'] = function(block) {
  var noteFrequency = block.getFieldValue('NOTE');
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '500';
  var code = '';
  
  // Add tone library include
  Blockly.Arduino.definitions_['define_tone32'] = '#include <Tone32.h>';
  Blockly.Arduino.definitions_['define_buzzer_channel'] = '#define BUZZER_CHANNEL 0';
  
  code += '// Play musical note\n';
  code += 'tone(15, ' + noteFrequency + ', ' + duration + ', BUZZER_CHANNEL);\n';
  code += 'delay(' + duration + ');\n';
  
  return code;
};

Blockly.Arduino['jazrobot_stop_tone'] = function(block) {
  // Add tone library include
  Blockly.Arduino.definitions_['define_tone32'] = '#include <Tone32.h>';
  Blockly.Arduino.definitions_['define_buzzer_channel'] = '#define BUZZER_CHANNEL 0';
  
  var code = '// Stop playing tone\n';
  code += 'noTone(15, BUZZER_CHANNEL);\n';
  
  return code;
};

// RTTTL Music code generators
Blockly.Arduino['jazrobot_play_rtttl'] = function(block) {
  var song = block.getFieldValue('SONG');
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '5000';
  var code = '';
  
  // Add NonBlockingRtttl library include
  Blockly.Arduino.definitions_['define_nonblockingrtttl'] = '#include <NonBlockingRtttl.h>';
  Blockly.Arduino.definitions_['define_buzzer_pin'] = '#define BUZZER_PIN 15';
  
  // Add song definitions
  Blockly.Arduino.definitions_['define_song_starwars'] = 'const char * StarWars = "StarWars:d=32,o=5,b=45,l=2:p,f#,f#,f#,8b.,8f#.6,e6,d#6,c#6,8b.6,16f#.6,e6,d#6,c#6,8b.6,16f#.6,e6,d#6,e6,8c#6";';
  Blockly.Arduino.definitions_['define_song_missionimp'] = 'const char * MissionImp = "MissionImp:d=16,o=6,b=95:32d,32d#,32d,32d#,32d,32d#,32d,32d#,32d,32d,32d#,32e,32f,32f#,32g,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,a#,g,2d,32p,a#,g,2c#,32p,a#,g,2c,a#5,8c,2p,32p,a#5,g5,2f#,32p,a#5,g5,2f,32p,a#5,g5,2e,d#,8d";';
  Blockly.Arduino.definitions_['define_song_supermario'] = 'const char * SuperMario = "SuperMario:d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p,8g,8p,8c6,16p,8g,16p,8e,16p,8a,8b,16a#,8a,16g.,16e6,16g6,8a6,16f6,8g6,8e6,16c6,16d6,8b,16p,8c6,16p,8g,16p,8e,16p,8a,8b,16a#,8a,16g.,16e6,16g6,8a6,16f6,8g6,8e6,16c6,16d6,8b,8p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16g#,16a,16c6,16p,16a,16c6,16d6,8p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16c7,16p,16c7,16c7,p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16g#,16a,16c6,16p,16a,16c6,16d6,8p,16d#6,8p,16d6,8p,16c6";';
  Blockly.Arduino.definitions_['define_song_entertainer'] = 'const char * Entertainer = "Entertainer:d=4,o=5,b=140:8d,8d#,8e,c6,8e,c6,8e,2c.6,8c6,8d6,8d#6,8e6,8c6,8d6,e6,8b,d6,2c6,p,8d,8d#,8e,c6,8e,c6,8e,2c.6,8p,8a,8g,8f#,8a,8c6,e6,8d6,8c6,8a,2d6";';
  Blockly.Arduino.definitions_['define_song_muppets'] = 'const char * Muppets = "Muppets:d=4,o=5,b=250:c6,c6,a,b,8a,b,g,p,c6,c6,a,8b,8a,8p,g.,p,e,e,g,f,8e,f,8c6,8c,8d,e,8e,8e,8p,8e,g,2p,c6,c6,a,b,8a,b,g,p,c6,c6,a,8b,a,g.,p,e,e,g,f,8e,f,8c6,8c,8d,e,8e,d,8d,c";';
  Blockly.Arduino.definitions_['define_song_indiana'] = 'const char * Indiana = "Indiana:d=4,o=5,b=250:e,8p,8f,8g,8p,1c6,8p.,d,8p,8e,1f,p.,g,8p,8a,8b,8p,1f6,p,a,8p,8b,2c6,2d6,2e6,e,8p,8f,8g,8p,1c6,p,d6,8p,8e6,1f.6,g,8p,8g,e.6,8p,d6,8p,8g,e.6,8p,d6,8p,8g,f.6,8p,e6,8p,8d6,2c6";';
  Blockly.Arduino.definitions_['define_song_pinkpanther'] = 'const char * PinkPanther = "PinkPanther:d=16,o=5,b=160:8d#,8e,2p,8f#,8g,2p,8d#,8e,p,8f#,8g,p,8c6,8b,p,8d#,8e,p,8b,2a#,2p,a,g,e,d,2e";';
  Blockly.Arduino.definitions_['define_song_takeonme'] = 'const char * TakeOnMe = "TakeOnMe:d=8,o=4,b=160:f#5,f#5,f#5,d5,p,b,p,e5,p,e5,p,e5,g#5,g#5,a5,b5,a5,a5,a5,e5,p,d5,p,f#5,p,f#5,p,f#5,e5,e5,f#5,e5,f#5,f#5,f#5,d5,p,b,p,e5,p,e5,p,e5,g#5,g#5,a5,b5,a5,a5,a5,e5,p,d5,p,f#5,p,f#5,p,f#5,e5,e5";';
  Blockly.Arduino.definitions_['define_song_jinglebell'] = 'const char * JingleBell = "JingleBell:d=8,o=5,b=112:a,a,4a,a,a,4a,a,c6,f.,16g,2a,a#,a#,a#.,16a#,a#,a,a.,16a,a,g,g,a,4g,4c6,16p,a,a,4a,a,a,4a,a,c6,f.,16g,2a,a#,a#,a#.,16a#,a#,a,a.,16a,c6,c6,a#,g,2f";';
  Blockly.Arduino.definitions_['define_song_silentnight'] = 'const char * SilentNight = "SilentNight:d=4,o=5,b=112:g.,8a,g,2e.,g.,8a,g,2e.,2d6,d6,2b.,2c6,c6,2g.,2a,a,c6.,8b,a,g.,8a,g,2e.,2a,a,c6.,8b,a,g.,8a,g,2e.,2d6,d6,f6.,8d6,b,2c6.,2e6.,c6,g,e,g.,8f,d,2c.";';
  Blockly.Arduino.definitions_['define_song_amazinggrace'] = 'const char * AmazingGrace = "AmazingGrace:d=8,o=5,b=80:c,f,2f,a,g,f,2a,a,g,2f,4d,2c,c,f,2f,a,g,f,2a,g,a,2c.6";';
  
  code += '// Play RTTTL Song\n';
  code += 'if (!rtttl::isPlaying()) {\n';
  code += '  rtttl::begin(BUZZER_PIN, ' + song + ');\n';
  code += '  unsigned long start = millis();\n';
  code += '  while (millis() - start < ' + duration + ') {\n';
  code += '    rtttl::play();\n';
  code += '  }\n';
  code += '  rtttl::stop();\n';
  code += '}\n';
  
  return code;
};

Blockly.Arduino['jazrobot_stop_music'] = function(block) {
  // Add NonBlockingRtttl library include
  Blockly.Arduino.definitions_['define_nonblockingrtttl'] = '#include <NonBlockingRtttl.h>';
  Blockly.Arduino.definitions_['define_buzzer_pin'] = '#define BUZZER_PIN 15';
  
  var code = '// Stop RTTTL Music\n';
  code += 'rtttl::stop();\n';
  
  return code;
};

// Sensor code generators
Blockly.Arduino['jazrobot_ultrasonic_read'] = function(block) {
  var trigPin = 18; // Hardcoded Trig pin
  var echoPin = 4;  // Hardcoded Echo pin

  // Define variables and setup pins using fixed names
  var definePinKey = 'define_ultrasonic_pins_18_4';
  var setupPinKey = 'setup_ultrasonic_18_4';
  var funcName = 'readUltrasonicDistance_18_4';

  Blockly.Arduino.definitions_[definePinKey] = 
    'const int trigPin_18 = ' + trigPin + ';\n' +
    'const int echoPin_4 = ' + echoPin + ';';

  Blockly.Arduino.setups_[setupPinKey] = 
    'pinMode(trigPin_18, OUTPUT);\n' +
    'pinMode(echoPin_4, INPUT);';

  // Function to read distance
  var functionCode = 
    'long ' + funcName + '() {\n' +
    '  digitalWrite(trigPin_18, LOW);\n' +
    '  delayMicroseconds(2);\n' +
    '  digitalWrite(trigPin_18, HIGH);\n' +
    '  delayMicroseconds(10);\n' +
    '  digitalWrite(trigPin_18, LOW);\n' +
    '  long duration = pulseIn(echoPin_4, HIGH);\n' +
    '  long distance = duration / 58.2;\n' +
    '  return distance;\n' +
    '}';
  Blockly.Arduino.definitions_[funcName] = functionCode;

  // Return the function call
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};

// Custom Control Logic/Math Generators
Blockly.Arduino['jazrobot_logic_compare'] = function(block) {
  // Logic Comparison Operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['jazrobot_math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_NEGATION : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Arduino['jazrobot_logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['jazrobot_line_follower'] = function(block) {
  var sensorPin = block.getFieldValue('SENSOR_PIN'); // Will be "33" or "36"
  var detectColor = block.getFieldValue('DETECT_COLOR'); // Will be "1" or "0"

  // Ensure pin is set to input in setup
  var setupPinKey = 'setup_line_follower_' + sensorPin;
  Blockly.Arduino.setups_[setupPinKey] = 'pinMode(' + sensorPin + ', INPUT);';
  
  // Generate the condition check
  var code = 'digitalRead(' + sensorPin + ') == ' + detectColor;
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};