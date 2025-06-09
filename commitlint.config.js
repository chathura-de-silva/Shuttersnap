export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // new feature
				'fix', // bug fix
				'docs', // documentation
				'style', // formatting, missing semi colons, etc
				'refactor', // code change that neither fixes a bug nor adds a feature
				'test', // adding tests
				'chore', // updating build tasks, package manager configs, etc
				'perf', // performance improvements
				'ci', // continuous integration
				'build', // build system or external dependencies
				'revert' // reverting previous commit
			]
		],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'header-max-length': [2, 'always', 72]
	}
};
