import { generateCheckListType } from '../common/checklist';

const Furniture = generateCheckListType(
	`furniture`,
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
				const { villagerSources } = item as { villagerSources: string };
				return <span>{ villagerSources }</span>;
			},
			title: `Villager Sources`,
		},
		{
			render: ( item: object ) => {
				const { size } = item as { size: string };
				return <span>{ size }</span>;
			},
			title: `Size`,
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
				const { hraFurnitureEssentialsType } = item as { hraFurnitureEssentialsType: string };
				return <span>{ hraFurnitureEssentialsType }</span>;
			},
			title: `HRA Furniture Essentials Type`,
		},
		{
			render: ( item: object ) => {
				const { hraSeries } = item as { hraSeries: string };
				return <span>{ hraSeries }</span>;
			},
			title: `HRA Series`,
		},
		{
			render: ( item: object ) => {
				const { hraSeriesType } = item as { hraSeriesType: string };
				return <span>{ hraSeriesType }</span>;
			},
			title: `HRA Series Type`,
		},
		{
			render: ( item: object ) => {
				const { fengshui } = item as { fengshui: string };
				return <span className={ fengshui.toLowerCase() }>{ fengshui }</span>;
			},
			title: `Feng Shui`,
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

export default Furniture;
