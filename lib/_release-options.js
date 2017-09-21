// TODO: write test to check whether there are any duplicates (short or name)
export const options = [
    {
        short: '-u',
        name: 'username',
        valueType: '<repo owner>',
        description: 'The username of the repo e.g. github-tools'
    },
    {
        short: '-r',
        name: 'repo',
        valueType: '<repository name>',
        description: 'The repository name e.g. github-release-notes'
    },
    {
        short: '-T',
        name: 'token',
        valueType: '<github token>',
        description: 'The token generated with repo access'
    },
    {
        short: '-au',
        name: 'api-url',
        valueType: '<url>',
        description: 'Override the GitHub API URL, allows gren to connect to a private GHE installation'
    },
    {
        short: '-o',
        name: 'override',
        description: 'Override the release notes if exist.'
    },
    {
        short: '-t',
        name: 'tags',
        valueType: '<old-tag>..<new-tag>',
        description: 'Write release notes for a range of tags, a specific tag or all. e.g. 0.2.0..0.1.0 or 0.2.0.. or ..0.1.0 or 0.2.0 or *', // needs to be documented better,
        action: value => value.split('..')
    },
    {
        short: '-D',
        name: 'data-source',
        valueType: '<source>',
        description: 'The informations you want to use to build release notes.',
        action: /^(issues|commits|milestones)$/i,
        defaultValue: 'issues'
    },
    {
        short: '-im',
        name: 'include-messages',
        valueType: '<merge|commits|all>',
        description: 'Filter the messages added to the release notes. Only used when --data-source used is commits',
        action: /^(merge|commits|all)$/i,
        defaultValue: 'commits'
    },
    {
        short: '-p',
        name: 'prefix',
        valueType: '<name prefix>',
        description: 'Add a prefix to the tag version. e.g. \'v\''
    },
    {
        short: '-d',
        name: 'draft',
        description: 'Set the release as a draft.'
    },
    {
        short: '-pr',
        name: 'prerelease',
        description: 'Set the release as a prerelease.'
    },
    {
        short: '-g',
        name: 'group-by',
        valueType: '<"label"|Object>',
        description: 'Group the issues using the labels as group headings. You can set custom headings for groups of labels from a configuration file.'
    },
    {
        short: '-L',
        name: 'ignore-labels',
        valueType: '<label1>,<label2>,<label3>',
        description: 'Ignore the specified labels.',
        action: value => value.split(',')
    },
    {
        short: '-I',
        name: 'ignore-issues-with',
        valueType: '<label1>,<label2>,<label3>',
        description: 'Ignore issues that contains one of the specified labels.',
        action: value => value.split(',')
    },
    {
        short: '-mm',
        name: 'milestone-match',
        valueType: '<prefix>',
        description: 'The title that the script needs to match to link the release to the milestone. e.g. v will match v0.1.0'
    },
    {
        short: '-M',
        name: 'only-milestones',
        description: 'Add to the release bodies only the issues that have a milestone'
    }
];
