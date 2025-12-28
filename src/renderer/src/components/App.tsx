import { useState } from 'react';

import Carpet from './Carpet';
import Clothing from './Clothing';
import Fish from './Fish';
import Fossils from './Fossils';
import Furniture from './Furniture';
import Gyroids from './Gyroids';
import Handhelds from './Handhelds';
import Insects from './Insects';
import Music from './Music';
import Search from './Search';
import Stationery from './Stationery';
import Wallpaper from './Wallpaper';

interface DataType {
	carpet: object[],
	clothing: object[],
	fish: object[],
	fossils: object[],
	furniture: object[],
	gyroids: object[],
	handhelds: object[],
	insects: object[],
	music: object[],
	stationery: object[],
	wallpaper: object[],
}

interface appPropTypes {
	data: DataType,
}

interface typeMenuPropTypes {
	currentType: ItemType,
	setItemType: ( type: ItemType ) => void,
}

interface typeMenuItemPropTypes {
	isSelected: boolean,
	setItemType: () => void,
	title: string,
}

enum ItemType {
	Carpet = `carpet`,
	Clothing = `clothing`,
	Fish = `fish`,
	Fossils = `fossils`,
	Furniture = `furniture`,
	Gyroids = `gyroids`,
	Handhelds = `handhelds`,
	Insects = `insects`,
	Music = `music`,
	Stationery = `stationery`,
	Wallpaper = `wallpaper`,
}

function App( props: appPropTypes ): React.JSX.Element {
	const { data } = props;
	const {
		carpet,
		clothing,
		fish,
		fossils,
		furniture,
		gyroids,
		handhelds,
		insects,
		music,
		stationery,
		wallpaper,
	} = data as DataType;
	const [ itemType, setItemType ] = useState<ItemType>( ItemType.Carpet );
	const [ checked, setChecked ] = useState<object>( generateCheckData( data ) );

	const generateOnCheck = ( type: ItemType ) => ( index: number ) => {
		return () => {
			const newChecked = {
				...checked,
				[ type ]: {
					...checked[ type ],
					[ index ]: !checked[ type ][ index ],
				},
			};
			setChecked( newChecked );
			localStorage.setItem( `${ type }-${ index }`, newChecked[ type ][ index ] ? `1` : `0` );
		};
	};

	const startExport = () => window.electronAPI.openExportWindow( checked );

	return <div className="app">
		<h1 className="app__title" title="Animal Crossing Checklist">Animal Crossing Checklist</h1>
		<TypeMenu currentType={ itemType } setItemType={ setItemType } />
		<div className="export">
			<button className="btn btn-secondary" type="button" onClick={ startExport }>Export Checklist</button>
		</div>
		<div>
			{ itemType === ItemType.Carpet && <Carpet
				list={ carpet }
				checked={ checked.carpet }
				generateOnCheck={ generateOnCheck( ItemType.Carpet ) }
			/> }
			{ itemType === ItemType.Clothing && <Clothing
				list={ clothing }
				checked={ checked.clothing }
				generateOnCheck={ generateOnCheck( ItemType.Clothing ) }
			/> }
			{ itemType === ItemType.Fish && <Fish
				list={ fish }
				checked={ checked.fish }
				generateOnCheck={ generateOnCheck( ItemType.Fish ) }
			/> }
			{ itemType === ItemType.Fossils && <Fossils
				list={ fossils }
				checked={ checked.fossils }
				generateOnCheck={ generateOnCheck( ItemType.Fossils ) }
			/> }
			{ itemType === ItemType.Furniture && <Furniture
				list={ furniture }
				checked={ checked.furniture }
				generateOnCheck={ generateOnCheck( ItemType.Furniture ) }
			/> }
			{ itemType === ItemType.Gyroids && <Gyroids
				list={ gyroids }
				checked={ checked.gyroids }
				generateOnCheck={ generateOnCheck( ItemType.Gyroids ) }
			/> }
			{ itemType === ItemType.Handhelds && <Handhelds
				list={ handhelds }
				checked={ checked.handhelds }
				generateOnCheck={ generateOnCheck( ItemType.Handhelds ) }
			/> }
			{ itemType === ItemType.Insects && <Insects
				list={ insects }
				checked={ checked.insects }
				generateOnCheck={ generateOnCheck( ItemType.Insects ) }
			/> }
			{ itemType === ItemType.Music && <Music
				list={ music }
				checked={ checked.music }
				generateOnCheck={ generateOnCheck( ItemType.Music ) }
			/> }
			{ itemType === ItemType.Stationery && <Stationery
				list={ stationery }
				checked={ checked.stationery }
				generateOnCheck={ generateOnCheck( ItemType.Stationery ) }
			/> }
			{ itemType === ItemType.Wallpaper && <Wallpaper
				list={ wallpaper }
				checked={ checked.wallpaper }
				generateOnCheck={ generateOnCheck( ItemType.Wallpaper ) }
			/> }
		</div>
		<Search />
	</div>;
}

function TypeMenu( props: typeMenuPropTypes ): React.JSX.Element {
	const { currentType, setItemType } = props;
	return <nav className="type-menu">
		<ul className="type-menu__list">
			{ Object.values( ItemType ).map( type => <TypeMenuItem
				key={ type }
				isSelected={ currentType === type }
				setItemType={ () => setItemType( type ) }
				title={ type.charAt( 0 ).toUpperCase() + type.slice( 1 ) }
			/> ) }
		</ul>
	</nav>;
}

function TypeMenuItem( props: typeMenuItemPropTypes ): React.JSX.Element {
	const { isSelected, setItemType, title } = props;
	return <li className="type-menu__item">
		<button
			className="btn btn-primary type-menu__button"
			disabled={ isSelected }
			type="button"
			onClick={ () => setItemType() }
		>
			{ title }
		</button>
	</li>;
}

function generateCheckData( data: object ): object {
	const out = {};
	for ( const key in data ) {
		out[ key ] = data[ key ].map( ( _: boolean, index: number ) => {
			const stored = localStorage.getItem( `${ key }-${ index }` );
			return stored === `1` ? true : false;
		} );
	}
	return out;
}

export default App;
