function updateConfigName(configSummary, nameInput) {
  configSummary.textContent = nameInput.value;
}

function checkCdtInserter(subConfigContainer, newCheckCdt) {
  // 找到动作区块
  const configAction = subConfigContainer.querySelector('details:last-child');
  // 将新的配置区块插入到动作区块之前
  subConfigContainer.insertBefore(newCheckCdt, configAction);
}

function collectFormData() {
  const formData = {};

  // 收集全局冷却时间
  const globalCooldown = document.getElementById('globalCooldown');
  if (globalCooldown) {
    formData.globalCooldown = globalCooldown.value;
  }

  // 收集配置项
  const configs = [];
  const configElements = document.querySelectorAll('#configContainer > details');
  configElements.forEach(configElement => {
    const config = {};

    // 收集触发方式、冷却时间和名字
    const triggerMode = configElement.querySelector('#triggerMode');
    const cooldownTime = configElement.querySelector('#cooldownTime');
    const name = configElement.querySelector('#name');
    if (triggerMode) config.triggerMode = triggerMode.value;
    if (cooldownTime) config.cooldownTime = cooldownTime.value;
    if (name) config.name = name.value;

    // 收集触发条件
    const triggerOn = configElement.querySelector('#trigger_on');
    if (triggerOn) {
      config.triggerOn = triggerOn.value;
      const extraTriggerValue = configElement.querySelector('#extraTriggerValue > div[style*="display: block"]');
      if (extraTriggerValue) {
        const triggerInputs = extraTriggerValue.querySelectorAll('input, select');
        triggerInputs.forEach(input => {
          config[input.id] = input.value;
        });
      }
    }

    // 收集检查条件
    const checkConditions = [];
    const checkElements = configElement.querySelectorAll('.subConfigContainer > details');
    checkElements.forEach(checkElement => {
      const check = {};

      const checkSelect = checkElement.querySelector('#check');
      if (checkSelect) {
        check.check = checkSelect.value;
        const extraCheckValue = checkElement.querySelector('#extraCheckValue > div[style*="display: block"]');
        if (extraCheckValue) {
          const checkInputs = extraCheckValue.querySelectorAll('input, select');
          checkInputs.forEach(input => {
            check[input.id] = input.value;
          });
        }
      }

      if (Object.keys(check).length > 0) {
        checkConditions.push(check);
      }
    });
    if (checkConditions.length > 0) {
      config.checkConditions = checkConditions;
    }

    // 收集动作
    const textContent = configElement.querySelector('#textContent');
    if (textContent) {
      config.textContent = textContent.value;
    }

    if (Object.keys(config).length > 0) {
      configs.push(config);
    }
  });
  if (configs.length > 0) {
    formData.configs = configs;
  }

  return JSON.stringify(formData, null, 2);
}

function addNewConfig(newConfig) {
  newConfig.innerHTML = `
  <summary>未命名配置</summary>
  <div>
    <label for="triggerMode">触发方式：</label>
    <select id="triggerMode" name="triggerMode" autocomplete="off">
      <option value="random">随机</option>
      <option value="sequential_one">每次顺序发送一条</option>
      <option value="sequential_all">每次全部发送</option>
    </select>
    <br>
    <label for="cooldownTime">冷却时间：</label>
    <input type="number" id="cooldownTime" name="cooldownTime" min="0" value="30" autocomplete="off">
    <br>
    <label for="name">名字：</label>
    <input type="text" id="name" name="name" autocomplete="off">
    <br>
    <div class="subConfigContainer">
      <details>
        <summary>触发条件：</summary>
        <div>
          <label for="trigger_on">检测到：</label>
          <select id="trigger_on" name="trigger_on" autocomplete="off">
            <option value="">请选择...</option>
            <option value="LongswordLevelChanged">太刀气刃等级</option>
            <option value="WeaponType">持有武器</option>
            <option value="QuestState">任务状态</option>
            <option value="Fsm">动作代码</option>
            <option value="UseItem">按下道具</option>
            <option value="InsectGlaiveLight">猎虫精华变动</option>
            <option value="ChargeBlade">充能斧状态</option>
          </select>
          <br>
          <div id="extraTriggerValue">
            <div id="longswordLevelConfig" style="display: none;">
              <label for="onNewLevel">新：</label>
              <input type="number" id="onNewLevel" name="onNewLevel" value="3" min="0" max="3" autocomplete="off">
              <br>
              <label for="onOldLevel">原：</label>
              <input type="number" id="onOldLevel" name="onOldLevel" min="0" max="3" autocomplete="off">
              <br>
            </div>
            <div id="weaponTypeConfig" style="display: none;">
              <label for="onWeaponId">武器id：</label>
              <input type="number" id="onWeaponId" name="onWeaponId" value="0" min="0" max="13" autocomplete="off">
              <br>
            </div>
            <div id="questStateConfig" style="display: none;">
              <label for="onQuestState">任务状态：</label>
              <input type="number" id="onQuestState" name="onQuestState" min="0" max="3" autocomplete="off">
              <br>
            </div>
            <div id="fsmConfig" style="display: none;">
              <label>新状态：</label>
              <select id="onNewFsmIndex" name="onNewFsmIndex" autocomplete="off">
                <option value="3">拔刀</option>
                <option value="0">收刀/硬直</option>
              </select>
              <label for="onNewFsmId">新动作ID：</label>
              <input type="number" id="onNewFsmId" name="onNewFsmId" min="0" max="499" autocomplete="off">
              <br>
              <label for="onOldFsmIndex">旧状态：</label>
              <select id="onOldFsmIndex" name="onOldFsmIndex" autocomplete="off">
                <option value="">不检测</option>
                <option value="3">拔刀</option>
                <option value="0">收刀/硬直</option>
              </select>
              <label for="onOldFsmId">旧动作ID：</label>
              <input type="number" id="onOldFsmId" name="onOldFsmId" min="0" max="499" autocomplete="off">
              <br>
            </div>
            <div id="useItemConfig" style="display: none;">
              <label for="onUseItem">按下道具ID：</label>
              <input type="number" id="onUseItem" name="onUseItem" min="0" max="99999" autocomplete="off">
              <br>
            </div>
            <div id="insectGlaiveLightConfig" style="display: none;">
              <label for="onInsectGlaiveLight">当猎虫精华：</label>
              <br>
              <label>红灯现：</label>
              <select id="onInsectRedNew" name="onInsectRedNew" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <label>白灯现：</label>
              <select id="onInsectWhiteNew" name="onInsectWhiteNew" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <label>黄灯现：</label>
              <select id="onInsectYellowNew" name="onInsectYellowNew" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <br>
              <label>红灯原：</label>
              <select id="onInsectRedOld" name="onInsectRedOld" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <label>白灯原：</label>
              <select id="onInsectWhiteOld" name="onInsectWhiteOld" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <label>黄灯原：</label>
              <select id="onInsectYellowOld" name="onInsectYellowOld" autocomplete="off">
                <option value="">不检测</option>
                <option value="1">亮</option>
                <option value="0">灭</option>
              </select>
              <br>
            </div>
            <div id="chargeBladeConfig" style="display: none;">
              <label for="onChargeBladestate">没看懂，暂时只提供一体式简易触发器：</label>
              <br>
              <select id="onChargeBladeState" name="onChargeBladeState" autocomplete="off">
                <option value="swordCharged">红剑启用</option>
                <option value="shieldCharged">红盾启用</option>
                <option value="powerAxeOn">电锯启用</option>
                <option value="phialsLoaded">瓶子装填</option>
              </select>
              <br>
            </div>
          </div>
        </div>
      </details>
      <details>
        <summary>动作</summary>
        <div>
          <label for="textContent">发送文本内容：</label>
          <input type="text" id="textContent" name="textContent" autocomplete="off">
          <br>
        </div>
      </details>
    </div>
    <br>
    <button type="button" class="addCheckCdtBtn">添加检测条件</button>
    <button type="button" class="deleteConfigBtn">删除配置</button>
  </div>
  `;
  configContainer.appendChild(newConfig);
}

function triggerOnCtrl(triggerOnSelect, newConfig) {
  const triggerOnSection = {
      LongswordLevelChanged: newConfig.querySelector('#longswordLevelConfig'),
      WeaponType: newConfig.querySelector('#weaponTypeConfig'),
      QuestState: newConfig.querySelector('#questStateConfig'),
      Fsm: newConfig.querySelector('#fsmConfig'),
      UseItem: newConfig.querySelector('#useItemConfig'),
      InsectGlaiveLight: newConfig.querySelector('#insectGlaiveLightConfig'),
      ChargeBlade: newConfig.querySelector('#chargeBladeConfig')
  };

  function updateVisibility() {
      Object.values(triggerOnSection).forEach(section => {
          section.style.display = 'none';
      });

      const selectedTrigger = triggerOnSection[triggerOnSelect.value];
      if (selectedTrigger) {
          selectedTrigger.style.display = 'block';
      }
  }

  updateVisibility();

  // 如果默认选项未删除且当前选中的不是默认选项,则删除默认选项
  var emptyOption = triggerOnSelect.querySelector('option[value=""]');
  if (triggerOnSelect.value !== '' && emptyOption) {
      emptyOption.remove();
  }
}

function addNewCheckCdt(subConfigContainer) {
  const newCheckCdt = document.createElement('details');
  newCheckCdt.innerHTML = `
      <summary>检查条件</summary>
      <div>
          <label for="check">检查：</label>
          <select id="check" name="check">
          <option value="">请选择...</option>
          <option value="LongswordLevel">太刀气刃等级</option>
          <option value="WeaponType">当前武器</option>
          <option value="QuestState">任务状态</option>
          <option value="Fsm">动作代码</option>
          <option value="Damage">伤害检测</option>
          </select>
          <br>
          <div id="extraCheckValue">
          <div id="longswordLevelCheck" style="display: none;">
              <label for="checkLSLevel">新：</label>
              <input type="number" id="checkLSLevel" name="checkLSLevel" min="0" max="3" autocomplete="off">
              <br>
          </div>
          <div id="weaponTypeCheck" style="display: none;">
              <label for="checkWeaponId">武器id：</label>
              <input type="number" id="checkWeaponId" name="checkWeaponId" min="0" max="13" autocomplete="off">
              <br>
          </div>
          <div id="questStateCheck" style="display: none;">
              <label for="checkQuestState">任务状态：</label>
              <input type="number" id="checkQuestState" name="checkQuestState" min="0" max="3" autocomplete="off">
              <br>
          </div>
          <div id="fsmCheck" style="display: none;">
              <label>状态：</label>
              <select id="checkFsmIndex" name="checkFsmIndex" autocomplete="off">
              <option value="3">拔刀</option>
              <option value="0">收刀/硬直</option>
              </select>
              <label for="checkFsmId">动作ID：</label>
              <input type="number" id="checkFsmId" name="checkFsmId" min="0" max="499" autocomplete="off">
              <br>
          </div>
          <div id="dmgCheck" style="display: none;">
              <label for="checkDmgAmount">伤害量：</label>
              <select id="dmgComparison" name="checkDmgSinceFsmIndex" autocomplete="off">
              <option value="gt">大于</option>
              <option value="le">小于或等于</option>
              </select>
              <input type="number" id="checkDmgAmount" name="checkDmgAmount" autocomplete="off">
              <br>
              <label>状态：</label>
              <select id="checkDmgSinceFsmIndex" name="checkDmgSinceFsmIndex" autocomplete="off">
              <option value="3">拔刀</option>
              <option value="0">收刀/硬直</option>
              </select>
              <label for="checkDmgSinceFsmId">动作ID：</label>
              <input type="number" id="checkDmgSinceFsmId" name="checkDmgSinceFsmId" min="0" max="499" autocomplete="off">
              <br>
              <label for="timeoutValue">检测时长区间（毫秒）：</label>
              <input type="number" id="timeoutValue" name="timeoutValue" autocomplete="off">
              <br>
          </div>
          <button type="button" class="deleteCheckCdtBtn">删除条件检测</button>
      </div>
      `;
  const checkSelect = newCheckCdt.querySelector('#check');
  checkCdtInserter(subConfigContainer, newCheckCdt)
  checkCdtDeletionListener(newCheckCdt);
  checkCdtChangeListener(checkSelect, newCheckCdt);

  return newCheckCdt; 
}

function checkCdtCtrl(checkSelect, newCheckCdt) {
  const checkSections = {
      LongswordLevel: newCheckCdt.querySelector('#longswordLevelCheck'),
      WeaponType: newCheckCdt.querySelector('#weaponTypeCheck'),
      QuestState: newCheckCdt.querySelector('#questStateCheck'),
      Fsm: newCheckCdt.querySelector('#fsmCheck'),
      Damage: newCheckCdt.querySelector('#dmgCheck'),
  };

  //更新检查条件相关区域的可见性
  function updateVisibility() {
      Object.values(checkSections).forEach(section => {
          section.style.display = 'none';
      });

      const selectedCheck = checkSections[checkSelect.value];
      if (selectedCheck) {
          selectedCheck.style.display = 'block';
      }
  }

  updateVisibility();

  // 如果默认选项未删除且当前选中的不是默认选项，则删除默认选项
  var emptyOption = checkSelect.querySelector('option[value=""]');
  if (checkSelect.value !== '' && emptyOption) {
      emptyOption.remove();
  }

  checkSelect.addEventListener('change', updateVisibility);
}

function genJson() {
  const jsonOutput = collectFormData();
  configOutput.textContent = jsonOutput;
}

function genConfig() {
  const jsonString = document.getElementById('configOutput').value;
  const outputText = convertFormat(jsonString);
  const outputTextElement = document.getElementById('configTrans');
  if (outputTextElement) {
    outputTextElement.value = outputText;
  }
}