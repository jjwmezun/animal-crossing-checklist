import { generateCheckListType } from '../common/checklist';

const Music = generateCheckListType(
	`music`,
	[
		{
			render: ( item: object ) => {
				const { universalCode } = item as { universalCode: string };
				return <span>{ universalCode }</span>;
			},
			title: `Universal Code`,
		},
	],
);

export default Music;
