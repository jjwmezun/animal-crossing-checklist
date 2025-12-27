import { generateCheckListType } from '../common/checklist';

const Handhelds = generateCheckListType(
	`handhelds`,
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
				const { sources } = item as { sources: string };
				return <span>{ sources }</span>;
			},
			title: `Sources`,
		},
		{
			render: ( item: object ) => {
				const { type } = item as { type: string };
				return <span>{ type }</span>;
			},
			title: `Type`,
		},
		{
			render: ( item: object ) => {
				const { buyPrice } = item as { buyPrice: number };
				return <div className="number price">{ buyPrice ? buyPrice.toLocaleString() : `–` }</div>;
			},
			title: `Buy Price`,
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
				const { hraBasePoints } = item as { hraBasePoints: number };
				return <div className="number">{ hraBasePoints ? hraBasePoints.toLocaleString() : `` }</div>;
			},
			title: `HRA Base Points`,
		},
		{
			render: ( item: object ) => {
				const { universalCode } = item as { universalCode: string };
				return <span>{ universalCode }</span>;
			},
			title: `Universal Code`,
		},
	],
);

export default Handhelds;
