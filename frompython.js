//attempt to transfer python dictionary to javascript
//creds: https://www.youtube.com/watch?v=lSAFVMaaH-w

const spawner = require('child_process').spawn;

const data_to_pass_in = {
	data_sent: 'send this to python script',
	data_returned: undefined,
	int: 'definition of int',
	float: undefined,
	variable: undefined,
	string: undefined,
	boolean: undefined,
	char: undefined,
	data_type: undefined,
	function: undefined,
	parameter: undefined,
	argument: undefined,
	file_extension: undefined,
	OS: undefined,
	pdf: undefined,
	exe: undefined,
	dmg: undefined,
	pkg: undefined,
	cache: undefined,
	firewall: undefined,
	cloud_computing: undefined,
	vpn: undefined,
	data_mining: undefined,
	UI: undefined,
	internet: undefined,
	backend: undefined,
	frontend: undefined,
	application: undefined,
	api: undefined,
	bugs: undefined,
	software: undefined,
	ram: undefined

};

console.log('Data sent to python script:', data_to_pass_in);

const python_process = spawner('python', ['pytest.py', JSON.stringify(data_to_pass_in)]);

python_process.stdout.on('data', (data) => {
	console.log('data received from python script:', JSON.parse(data.toString()));
});