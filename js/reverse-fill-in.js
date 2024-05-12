function fillFormFromJson(jsonString) {
    const formData = JSON.parse(jsonString);
  
    // 获取配置容器和常规配置栏
    const configContainer = document.getElementById('configContainer');
    const generalConfig = configContainer.querySelector('details');
  
    // 清空动态生成的配置项,保留常规配置栏
    while (configContainer.children.length > 1) {
      configContainer.removeChild(configContainer.lastChild);
    }
  
    // 填入全局冷却时间
    if (formData.globalCooldown) {
      const globalCooldown = document.getElementById('globalCooldown');
      if (globalCooldown) {
        globalCooldown.value = formData.globalCooldown;
      }
    }
  
    // 填入配置项
    if (formData.configs) {
      formData.configs.forEach(config => {
        const newConfig = document.createElement('details');
        addNewConfig(newConfig);
        configContainer.appendChild(newConfig);
    
        // 填入触发方式、冷却时间和名字
        const triggerMode = newConfig.querySelector('#triggerMode');
        const cooldownTime = newConfig.querySelector('#cooldownTime');
        const name = newConfig.querySelector('#name');
        if (triggerMode && config.triggerMode) triggerMode.value = config.triggerMode;
        if (cooldownTime && config.cooldownTime) cooldownTime.value = config.cooldownTime;
        if (name && config.name) {
            name.value = config.name;
            const configSummary = newConfig.querySelector('summary');
            updateConfigName(configSummary, name); // 更新配置块的显示名
          }
  
        // 填入触发条件
        const triggerOn = newConfig.querySelector('#trigger_on');
        if (triggerOn && config.triggerOn) {
          triggerOn.value = config.triggerOn;
          triggerOnCtrl(triggerOn, newConfig);
          const extraTriggerValue = newConfig.querySelector('#extraTriggerValue > div[style*="display: block"]');
          if (extraTriggerValue) {
            const triggerInputs = extraTriggerValue.querySelectorAll('input, select');
            triggerInputs.forEach(input => {
              if (config[input.id]) input.value = config[input.id];
            });
          }
        }
        // 填入检查条件
        if (config.checkConditions) {
          const subConfigContainer = newConfig.querySelector('.subConfigContainer');
          config.checkConditions.forEach(check => {
            const newCheckCdt = addNewCheckCdt(subConfigContainer); // 将新创建的newCheckCdt元素赋值给变量
            const checkSelect = newCheckCdt.querySelector('#check');
            if (checkSelect && check.check) {
              checkSelect.value = check.check;
              checkCdtCtrl(checkSelect, newCheckCdt);
              const extraCheckValue = newCheckCdt.querySelector('#extraCheckValue > div[style*="display: block"]');
              if (extraCheckValue) {
                let checkKey = "";
                let checkValue = "";
                switch (check.check) {
                  case "LongswordLevel":
                    checkKey = "checkLSLevel";
                    checkValue = check.checkLSLevel;
                    break;
                  case "WeaponType":
                    checkKey = "checkWeaponId";
                    checkValue = check.checkWeaponId;
                    break;
                  case "QuestState":
                    checkKey = "checkQuestState";
                    checkValue = check.checkQuestState;
                    break;
                  case "Fsm":
                    checkKey = "checkFsmId";
                    checkValue = check.checkFsmId;
                    const checkFsmIndex = newCheckCdt.querySelector('#checkFsmIndex');
                    if (checkFsmIndex && check.checkFsmIndex) {
                      checkFsmIndex.value = check.checkFsmIndex;
                    }
                    break;
                  case "Damage":
                    const dmgComparison = newCheckCdt.querySelector('#dmgComparison');
                    const checkDmgAmount = newCheckCdt.querySelector('#checkDmgAmount');
                    const checkDmgSinceFsmIndex = newCheckCdt.querySelector('#checkDmgSinceFsmIndex');
                    const checkDmgSinceFsmId = newCheckCdt.querySelector('#checkDmgSinceFsmId');
                    const timeoutValue = newCheckCdt.querySelector('#timeoutValue');
                    if (dmgComparison && check.dmgComparison) {
                      dmgComparison.value = check.dmgComparison;
                    }
                    if (checkDmgAmount && check.checkDmgAmount) {
                      checkDmgAmount.value = check.checkDmgAmount;
                    }
                    if (checkDmgSinceFsmIndex && check.checkDmgSinceFsmIndex) {
                      checkDmgSinceFsmIndex.value = check.checkDmgSinceFsmIndex;
                    }
                    if (checkDmgSinceFsmId && check.checkDmgSinceFsmId) {
                      checkDmgSinceFsmId.value = check.checkDmgSinceFsmId;
                    }
                    if (timeoutValue && check.timeoutValue) {
                      timeoutValue.value = check.timeoutValue;
                    }
                    break;
                }
                if (checkKey) {
                  const checkInput = extraCheckValue.querySelector(`#${checkKey}`);
                  if (checkInput && checkValue) {
                    checkInput.value = checkValue;
                  }
                }
              }
            }
          });
        }
  
        // 填入动作
        const textContent = newConfig.querySelector('#textContent');
        if (textContent && config.textContent) {
          textContent.value = config.textContent;
        }
  
        // 添加事件监听器
        const configSummary = newConfig.querySelector('summary');
        const nameInput = newConfig.querySelector('#name');
        const addCheckCdtBtn = newConfig.querySelector('.addCheckCdtBtn');
        const subConfigContainer = newConfig.querySelector('.subConfigContainer');
        configSummaryUpdateListener(configSummary, nameInput);
        addCheckCdtListener(addCheckCdtBtn, subConfigContainer);
        configDeletionListener(newConfig);
      });
    }
  }
  