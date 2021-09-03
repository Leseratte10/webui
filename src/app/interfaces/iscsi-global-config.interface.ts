export interface IscsiGlobalConfig {
  alua: boolean;
  basename: string;
  id: number;
  isns_servers: string[];
  pool_avail_threshold: number;
}

export interface IscsiGlobalSession {
  initiator: string;
  initiator_addr: string;
  initiator_alias: string;
  target: string;
  target_alias: string;
  header_digest: string;
  data_digest: string;
  max_data_segment_length: number;
  max_receive_data_segment_length: number;
  max_burst_length: number;
  first_burst_length: number;
  immediate_data: boolean;
  iser: boolean;
  offload: boolean;
}
