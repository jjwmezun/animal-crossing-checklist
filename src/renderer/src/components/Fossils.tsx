import { generateCheckListType } from '../common/checklist';

const Fossils = generateCheckListType(
	`fossils`,
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
				const { fossilGroup } = item as { fossilGroup: string };
				return <span>{ fossilGroup }</span>;
			},
			title: `Fossil Group`,
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
				return <span>{ hraBasePoints.toLocaleString() }</span>;
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

export default Fossils;
