'use strict';

var exec = require('child_process').exec;
var chalk = require('chalk');
var Promise = Promise || require('es6-promise').Promise;

/**
* Execute a command in the bash and run a callback
*
* @since 0.5.0
* @private
*
* @param  {string}   command The command to execute
* @param  {Function} callback The callback which returns the stdout
*
* @return {Promise}
*/
function executeCommand(command, callback) {
    return new Promise(function(resolve, reject) {
        exec(command, function(err, stdout, stderr) {
            if (err || stderr) {
                reject(err || stderr);
            } else {
                resolve(stdout.replace('\n', ''));
            }
        });
    })
    .then(callback)
    .catch(function(error) {
        throw new Error(chalk.red(error) + chalk.yellow('Make sure you\'re running the command from the repo folder, or you using the --username and --repo flags.'));
    });
}

/**
* Get repo informations
*
* @since 0.5.0
* @public
*
* @param  {Function} callback
*
* @return {Promise} The promise that resolves repo informations ({user: user, name: name})
*/
function repo(callback) {
    return executeCommand('git config remote.origin.url', function(repo) {
        var repoPath = repo
        .replace(/([^:]*:)|\.[^.]+$/g, '')
        .split('/');
        var user = repoPath[0];
        var name = repoPath[1];

        return {
            username: user,
            repo: name
        };
    })
    .then(callback);
}

/**
* Get token informations
*
* @since 0.5.0
* @public
*
* @param  {Function} callback
*
* @return {Promise} The promise that resolves token informations ({token: token})
*/
function token(callback) {
    return executeCommand('echo $GREN_GITHUB_TOKEN', function(token) {
        return {
            token: token
        };
    })
    .then(callback);
}

module.exports = {
    repo: repo,
    token: token
};
