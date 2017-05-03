/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs-extra');
const path = require('path');

const SETUP = `
1.  Read [Prerequisites][prereq] and [How to run a sample][run] first.
1.  Install dependencies:

        pip install -r requirements.txt

[prereq]: ../README.md#prerequisities
[run]: ../README.md#how-to-run-a-sample`;

const TESTS = `
1.  Set the **GCLOUD_PROJECT** and **GOOGLE_APPLICATION_CREDENTIALS** environment variables.

1.  Run the tests:

        nox`;

module.exports = {
  global: {
    config: '.cloud-repo-tools.json',
    configKey: null
  },
  detect: (cwd) => fs.statSync(path.join(cwd, 'requirements.txt')).isFile(),
  load: (filename) => require(filename),
  lint: {
    cmd: 'nox',
    args: ['lint']
  },
  test: {
    app: {
      cmd: 'python',
      args: ['main.py']
    },
    build: {},
    install: {
      cmd: 'pip',
      args: ['install', '-r', 'requirements.txt']
    },
    run: {
      cmd: 'nox',
      args: []
    }
  },
  readme: {
    setup: SETUP,
    tests: TESTS
  }
};
