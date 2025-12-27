import { generateCheckListType } from '../common/checklist';

const Fish = generateCheckListType(
	`fish`,
	[
		{
			render: ( item: object ) => {
				const { icon } = item as { icon: string };
				return <img src={ `data:text/plain;base64,${ icon }` } alt="" />;
			},
			title: `Icon`,
		},
		{
			render: ( item: object ) => {
				const { location } = item as { location: string };
				return <span>{ location }</span>;
			},
			title: `Location`,
		},
		{
			render: ( item: object ) => {
				const { availability } = item as { availability: string };
				return <span>{ availability }</span>;
			},
			title: `Availability`,
		},
		{
			render: ( item: object ) => {
				const { peakMonths } = item as { peakMonths: string };
				return <span>{ peakMonths }</span>;
			},
			title: `Peak Months`,
		},
		{
			render: ( item: object ) => {
				const { time } = item as { time: string };
				return <span>{ time }</span>;
			},
			title: `Time`,
		},
		{
			render: ( item: object ) => {
				const { sellPrice } = item as { sellPrice: number };
				return <div className="number price">{ sellPrice ? sellPrice.toLocaleString() : `–` }</div>;
			},
			title: `Sell Price`,
		},
		{
			render: ( item: object ) => {
				const { onlySpawnInRain } = item as { onlySpawnInRain: boolean };
				return <span className={ onlySpawnInRain ? `yes` : `no` }>{ onlySpawnInRain ? `Yes` : `No` }</span>;
			},
			title: `Only Spawn in Rain`,
		},
		{
			render: ( item: object ) => {
				const { catchDifficulty } = item as { catchDifficulty: number };
				return <span>{ catchDifficulty }</span>;
			},
			title: `Catch Difficulty`,
		},
		{
			render: ( item: object ) => {
				const { shadowSize } = item as { shadowSize: number };
				return <span>{ shadowSize }</span>;
			},
			title: `Shadow Size`,
		},
		{
			render: ( item: object ) => {
				const { blathersQuote } = item as { blathersQuote: string };
				return <span dangerouslySetInnerHTML={ { __html: blathersQuote } }/>;
			},
			title: `Blather’s Quote`,
		},
		{
			render: ( item: object ) => {
				const { catchQuote } = item as { catchQuote: string };
				return <span dangerouslySetInnerHTML={ { __html: catchQuote } }/>;
			},
			title: `Catch Quote`,
		},
	],
);

export default Fish;
