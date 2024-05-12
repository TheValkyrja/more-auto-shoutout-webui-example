case "ChargeBlade":
  const { onPhialTypeNew, onPhialTypeOld, onShieldChargeNew, onShieldChargeOld, onSwordChargeNew, onSwordChargeOld } = config;

  if (onPhialTypeNew || onPhialTypeOld) {
    result += 'phial_type = {';
    if (onPhialTypeNew) {
      result += ` new = ${onPhialTypeNew}`;
    }
    if (onPhialTypeOld) {
      result += ` ${onPhialTypeNew ? ',' : ''} old = ${onPhialTypeOld}`;
    }
    result += '}\n';
  }

  if (onShieldChargeNew || onShieldChargeOld) {
    result += 'shield_charge = {';
    if (onShieldChargeNew) {
      result += ` new = ${onShieldChargeNew}`;
    }
    if (onShieldChargeOld) {
      result += ` ${onShieldChargeNew ? ',' : ''} old = ${onShieldChargeOld}`;
    }
    result += '}\n';
  }

  if (onSwordChargeNew || onSwordChargeOld) {
    result += 'sword_charge = {';  
    if (onSwordChargeNew) {
      result += ` new = ${onSwordChargeNew}`;
    }
    if (onSwordChargeOld) {
      result += ` ${onSwordChargeNew ? ',' : ''} old = ${onSwordChargeOld}`;
    }
    result += '}\n';
  }
  break;