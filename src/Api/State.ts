import {entryUrl} from './Common';

const stateUrl = entryUrl + '/api/1/vehicles';

export interface IVehicle {
  access_type: string;
  api_version: number;
  backseat_token?: string;
  backseat_token_updated_at?: string;
  calendar_enable: boolean;
  color: string;
  display_name: string;
  id: number;
  id_s: string;
  in_service: boolean;
  option_codes: string;
  state: string; //TODO: 값이 정해져있을테니 해당 값들을 추가로 enum 으로 만들기
  tokens: Array<any>;
  vehicle_id: number;
  vin: string;
}

type IVehicles = Array<IVehicle>;

export const requestState = async (
  body: string,
): Promise<IVehicle | undefined> => {
  try {
    const body_bearer = 'Bearer ' + body;

    const httpResponse = await fetch(stateUrl, {
      method: 'GET',
      headers: {
        Authorization: body_bearer,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      return;
    }
    const result = await httpResponse.json();

    const vehicle_status: IVehicles = result.response;

    return vehicle_status[0];
  } catch (e) {
    console.log('requestState error');
    console.log('e : ', e);
    throw e;
  }
};

export interface IVehicleAll {
  id: number;
  user_id: number;
  vehicle_id: number;
  vin: string;
  display_name: string;
  option_codes: string;
  color?: string;
  tokens: Array<any>;
  state: string; //TODO: 값이 정해져있을테니 해당 값들을 추가로 enum 으로 만들기
  in_service: boolean;
  id_s: string;
  calendar_enable: boolean;
  api_version: number;
  backseat_token?: string;
  backseat_token_updated_at?: string;
  charge_state: charge_state;
  climate_state: climate_state;
  drive_state: drive_state;
  gui_settings: gui_settings;
  vehicle_config: vehicle_config;
  vehicle_state: vehicle_state;
}

export interface charge_state {
  battery_heater_on: boolean;
  battery_level: number;
  battery_range: number;
  charge_current_request: number;
  charge_current_request_max: number;
  charge_enable_request: boolean;
  charge_energy_added: number;
  charge_limit_soc: number;
  charge_limit_soc_max: number;
  charge_limit_soc_min: number;
  charge_limit_soc_std: number;
  charge_miles_added_ideal: number;
  charge_miles_added_rated: number;
  charge_port_cold_weather_mode?: string;
  charge_port_door_open: boolean;
  charge_port_latch: string;
  charge_rate: number;
  charge_to_max_range: boolean;
  charger_actual_current: number;
  charger_phases?: string;
  charger_pilot_current: number;
  charger_power: number;
  charger_voltage: number;
  charging_state: string;
  conn_charge_cable: string;
  est_battery_range: number;
  fast_charger_brand: string;
  fast_charger_present: boolean;
  fast_charger_type: string;
  ideal_battery_range: number;
  managed_charging_active: boolean;
  managed_charging_start_time?: string;
  managed_charging_user_canceled: boolean;
  max_range_charge_counter: number;
  not_enough_power_to_heat: boolean;
  scheduled_charging_pending: boolean;
  scheduled_charging_start_time?: string;
  time_to_full_charge: number;
  timestamp: number;
  trip_charging: boolean;
  usable_battery_level: number;
  user_charge_enable_request?: string;
}

export interface climate_state {
  battery_heater: boolean;
  battery_heater_no_power: boolean;
  climate_keeper_mode: string;
  driver_temp_setting: number;
  fan_status: number;
  inside_temp: number;
  is_auto_conditioning_on: boolean;
  is_climate_on: boolean;
  is_front_defroster_on: boolean;
  is_preconditioning: boolean;
  is_rear_defroster_on: boolean;
  left_temp_direction: number;
  max_avail_temp: number;
  min_avail_temp: number;
  outside_temp: number;
  passenger_temp_setting: number;
  remote_heater_control_enabled: boolean;
  right_temp_direction: number;
  seat_heater_left: number;
  seat_heater_rear_left: number;
  seat_heater_rear_right: number;
  seat_heater_right: number;
  seat_heater_third_row_left: number;
  seat_heater_third_row_right: number;
  side_mirror_heaters: boolean;
  smart_preconditioning: boolean;
  steering_wheel_heater: boolean;
  timestamp: number;
  wiper_blade_heater: boolean;
}

export interface drive_state {
  gps_as_of: number;
  heading: number;
  latitude: number;
  longitude: number;
  native_latitude: number;
  native_location_supported: number;
  native_longitude: number;
  native_type: string;
  power?: string;
  shift_state?: string;
  speed?: string;
  timestamp: number;
}

export interface vehicle_config {
  can_accept_navigation_requests: boolean;
  can_actuate_trunks: boolean;
  car_special_type: string; //"base",
  car_type: string; //"modelx",
  charge_port_type: string; //"US",
  eu_vehicle: boolean;
  exterior_color: string; //"MetallicBlack",
  has_air_suspension: boolean;
  has_ludicrous_mode: boolean;
  motorized_charge_port: boolean;
  perf_config: string; //"P1",
  plg: boolean;
  rear_seat_heaters: number;
  rear_seat_type: number;
  rhd: boolean;
  roof_color: string; //"None",
  seat_type: number;
  spoiler_type: string; // "Passive",
  sun_roof_installed: number;
  third_row_seats: string; //"FuturisFoldFlat",
  timestamp: number;
  trim_badging: string; //"90d",
  wheel_type: string; //"AeroTurbine20"
}
export interface gui_settings {
  gui_24_hour_time: boolean;
  gui_charge_rate_units: string; //"mi/hr",
  gui_distance_units: string; //"mi/hr",
  gui_range_display: string; //"Rated",
  gui_temperature_units: string; //"F",
  timestamp: number;
}

export interface vehicle_state {
  api_version: number;
  autopark_state_v2: string; //"ready",
  autopark_style: string; //"dead_man",
  calendar_supported: boolean;
  car_version: string; //"2019.12.1.1 4b1dd29",
  center_display_state: number;
  dashcam_clip_save_available: boolean;
  df: number;
  dr: number;
  ft: number;
  homelink_nearby: boolean;
  is_user_present: boolean;
  last_autopark_error: string; //"no_error",
  locked: boolean;
  media_state: Array<any>;
  notifications_supported: boolean;
  odometer: number;
  parsed_calendar_supported: boolean;
  pf: number;
  pr: number;
  remote_start: boolean;
  remote_start_enabled: boolean;
  remote_start_supported: boolean;
  rt: number;
  sentry_mode: boolean;
  software_update: Array<any>;
  speed_limit_mode: Array<any>;
  sun_roof_percent_open?: string;
  sun_roof_state: string; //"unknown",
  timestamp: number;
  valet_mode: boolean;
  vehicle_name: string; //":name"
}

export interface media_state {}

export const requsetVehicleState = async (
  accessToken: string,
  id: number,
): Promise<IVehicleAll | undefined> => {
  console.log('***********requsetVehicleState************');
  try {
    const auth = 'Bearer ' + accessToken;

    const vehicle_data_URL =
      entryUrl + '/api/1/vehicles/' + id + '/vehicle_data';

    const httpResponse = await fetch(vehicle_data_URL, {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result = await httpResponse.json();

    //  console.log('result : ', result);

    const vehicle_status_all: IVehicleAll = result.response;

    // console.log('vehicle_status_all : ', vehicle_status_all);
    //console.log('#######ft####### : ', vehicle_status_all.vehicle_state.ft);
    //console.log('#######rt####### : ', vehicle_status_all.vehicle_state.rt);
    return vehicle_status_all;
  } catch (e) {
    console.log('requsetVehicleState error');
    console.log('e : ', e);
    throw e;
  }
};
