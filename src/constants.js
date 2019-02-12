const PORT_CONTROL = '5002';
const PORT_HANDLER = '5003';
const SERVER = '127.0.0.1';
// const SERVER = '10.132.54.17';
// const SERVER = '10.132.54.75';
// const SERVER = '192.168.101.22';

export default {
  DEFAULT_URL: `http://${SERVER}:${PORT_CONTROL}/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService`,
  HANDLER_URL: `http://${SERVER}:${PORT_HANDLER}/invoke?cmd=Intrion.Service.MonorailHandler.StartNewSimulation`,
};
