function convertFormat(inputJson) {
  try {
    const data = JSON.parse(inputJson);
    let result = `trigger_cd = ${data.globalCooldown}\n\n`;

    if (Array.isArray(data.configs)) {
      for (const config of data.configs) {
        if (Object.keys(config).length === 0) continue;

        result += "-------介系一条分割线-------\n\n[[trigger]]\n";
        result += `action_mode = "${config.triggerMode}"\n`;
        result += `cooldown = ${config.cooldownTime}\n`;
        result += `name = "${config.name}"\n\n`;

      const triggerOn = config.triggerOn;
      if (triggerOn) {
        let triggerOnKey = "";
        switch (triggerOn) {
          case "LongswordLevelChanged":
            triggerOnKey = "longsword_level_changed";
            break;
          case "WeaponType":
            triggerOnKey = "weapon_type";
            break;
          case "QuestState":
            triggerOnKey = "quest_state";
            break;
          case "Fsm":
            triggerOnKey = "fsm";
            break;
          case "UseItem":
            triggerOnKey = "use_item";
            break;
          case "InsectGlaiveLight":
            triggerOnKey = "insect_glaive_light";
            break;
          case "ChargeBlade":
            triggerOnKey = "charge_blade";
            break;
        }
        result += `[trigger.trigger_on.${triggerOnKey}]\n`;

        switch (triggerOn) {
          case "LongswordLevelChanged":
            if (config.onNewLevel !== "") result += `new = ${config.onNewLevel}\n`;
            if (config.onOldLevel !== "") result += `old = ${config.onOldLevel}\n`;
            break;
          case "WeaponType":
            if (config.onWeaponId !== "") result += `value = ${config.onWeaponId}\n`;
            break;
          case "QuestState":
            if (config.onQuestState !== "") result += `value = ${config.onQuestState}\n`;
            break;
          case "Fsm":
            if (config.onNewFsmIndex !== "" || config.onNewFsmId !== "") 
              result += `new = { target = ${config.onNewFsmIndex}, id = ${config.onNewFsmId} }\n`;
            if (config.onOldFsmIndex !== "" || config.onOldFsmId !== "") 
              result += `old = { target = ${config.onOldFsmIndex}, id = ${config.onOldFsmId} }\n`;
            break;
          case "UseItem":
            if (config.onUseItem !== "") result += `item_id = ${config.onUseItem}\n`;
            break;
          case "InsectGlaiveLight":
            const { onInsectRedNew, onInsectWhiteNew, onInsectYellowNew, onInsectRedOld, onInsectWhiteOld, onInsectYellowOld } = config;

            if (onInsectRedNew || onInsectRedOld) {
              result += 'red = {';
              if (onInsectRedNew) {
                result += ` new = { ${onInsectRedNew === '1' ? 'gt' : 'le'} = 0 }`;
              }
              if (onInsectRedOld) {
                result += ` ${onInsectRedNew ? ',' : ''} old = { ${onInsectRedOld === '1' ? 'gt' : 'le'} = 0 }`;
              }
              result += '}\n';
            }

            if (onInsectWhiteNew || onInsectWhiteOld) {
              result += 'white = {';
              if (onInsectWhiteNew) {
                result += ` new = { ${onInsectWhiteNew === '1' ? 'gt' : 'le'} = 0 }`;
              }
              if (onInsectWhiteOld) {
                result += ` ${onInsectWhiteNew ? ',' : ''} old = { ${onInsectWhiteOld === '1' ? 'gt' : 'le'} = 0 }`;
              }
              result += '}\n';
            }

            if (onInsectYellowNew || onInsectYellowOld) {
              result += 'yellow = {';
              if (onInsectYellowNew) {
                result += ` new = { ${onInsectYellowNew === '1' ? 'gt' : 'le'} = 0 }`;
              }
              if (onInsectYellowOld) {
                result += ` ${onInsectYellowNew ? ',' : ''} old = { ${onInsectYellowOld === '1' ? 'gt' : 'le'} = 0 }`;
              }
              result += '}\n';
            }
            break;
          case "ChargeBlade":
            switch (config.onChargeBladeState) {
              case "swordCharged":
                result += `sword_charge_timer = { new = { gt = 0 }, old = { le = 0 } }\n`;
                break;
              case "shieldCharged":
                result += `shield_charge_timer = { new = { gt = 0 }, old = { le = 0 } }\n`;
                break;
              case "powerAxeOn":
                result += `power_axe_timer = { new = "enabled" }\n`;
                break;
              case "phialsLoaded":
                result += `phials = { new = "full" }\n`;
                break;
            }
            break;
        }
        result += "\n";
      }

      if (config.checkConditions) {
        for (const condition of config.checkConditions) {
          if (!condition.check) continue;

          let checkKey = "";
          let checkValue = "";
          switch (condition.check) {
            case "LongswordLevel":
              checkKey = "longsword_level";
              checkValue = `.value = ${condition.checkLSLevel}`;
              break;
            case "WeaponType":
              checkKey = "weapon_type";
              checkValue = `.value = ${condition.checkWeaponId}`;
              break;
            case "QuestState":
              checkKey = "quest_state";
              checkValue = `.value = ${condition.checkQuestState}`;
              break;
            case "Fsm":
              checkKey = "fsm";
              checkValue = `.value = { target = ${condition.checkFsmIndex}, id = ${condition.checkFsmId} }`;
              break;
            case "Damage":
              checkKey = "[trigger.check.damage]\n";
              checkValue = `damage = { ${condition.dmgComparison} = ${condition.checkDmgAmount} } \n`;
              checkValue += `fsm = { target = ${condition.checkDmgSinceFsmIndex}, id = ${condition.checkDmgSinceFsmId} } \n`;
              if (condition.timeoutValue) {
                checkValue += `timeout = ${condition.timeoutValue}`;
              }
              checkValue += `\n`;
              break;
          }

          if (checkKey) {
            result += "[[trigger.check]]\n";
            result += `${checkKey}${checkValue}\n\n`;
          }
        }
      }

      result += "[[trigger.action]]\n";
      result += 'cmd = "SendChatMessage"\n';
      result += `param = "${config.textContent}"\n\n`;
    }
  }

  return result;
} catch (error) {
  console.error("Invalid JSON format:", error);
  return "";
}
}