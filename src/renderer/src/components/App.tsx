import { useEffect, useState } from 'react';

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
	const [ hardSave, setHardSave ] = useState<object | null>( generateHardSaveData( data ) );

	const dataIsEmpty = isDataEmpty( checked );
	const disableHardSave = dataIsEmpty || ( hardSave !== null && testDataAreEqual( checked, hardSave ) );
	const disableLoadHardSave = hardSave === null || testDataAreEqual( checked, hardSave );

	const clearChecklist = () => {
		if ( confirm( `¿Are you sure you want to clear your checklist? This action can’t be undone.` ) ) {
			const newChecked = generateEmptyCheckData( data );
			setChecked( newChecked );
			setHardSave( null );
			for ( const type in newChecked ) {
				for ( let i = 0; i < data[ type ].length; i++ ) {
					localStorage.removeItem( `${ type }-${ i }` );
				}
			}
			localStorage.removeItem( `hard-save` );
		}
	};

	const onImportData = ( _event: Electron.IpcRendererEvent, importData: object ) => {
		setChecked( importData );
		updateLocalStorage( importData );
	};

	const generateOnCheck = ( type: ItemType ) => ( index: number ) => {
		return () => {
			const newChecked = { ...checked };
			newChecked[ type ][ index ] = !newChecked[ type ][ index ];
			setChecked( newChecked );
			saveCheck( type, index, newChecked );
		};
	};

	const startExport = () => window.electronAPI.openExportWindow( checked );

	const startImport = () => {
		if ( dataIsEmpty
			|| confirm( `Importing a checklist will o’erwrite your current checklist.
				¿Are you sure you want to continue?` )
		) {
			window.electronAPI.openImportWindow();
		}
	};

	const updateHardSave = () => {
		const newHardSave = structuredClone( checked );
		setHardSave( newHardSave );
		const hardSaveString = createHardSaveString( newHardSave );
		localStorage.setItem( `hard-save`, hardSaveString );
	};

	const loadHardSave = () => {
		if ( hardSave === null ) {
			return;
		}
		if ( confirm( `¿Are you sure you want to load the hard save? This will o’erwrite your current checklist.` ) ) {
			const newChecked = structuredClone( hardSave );
			setChecked( newChecked );
			updateLocalStorage( newChecked );
		}
	};

	useEffect( () => {
		window.electronAPI.on( `import-data`, onImportData );
		return () => window.electronAPI.remove( `import-data` );
	}, [] );

	return <div className="app">
		<h1 className="app__title" title="Animal Crossing Checklist">Animal Crossing Checklist</h1>
		<TypeMenu currentType={ itemType } setItemType={ setItemType } />
		<div className="export">
			<button
				className="btn btn-secondary"
				disabled={ disableHardSave }
				type="button"
				onClick={ updateHardSave }
			>
				Create Hard Save
			</button>
			<button
				className="btn btn-secondary"
				disabled={ disableLoadHardSave }
				type="button"
				onClick={ loadHardSave }
			>
				Load Hard Save
			</button>
			<button
				className="btn btn-secondary"
				disabled={ dataIsEmpty }
				type="button"
				onClick={ startExport }
			>
				Export Checklist
			</button>
			<button
				className="btn btn-secondary"
				type="button"
				onClick={ startImport }
			>
				Import Checklist
			</button>
			<button
				className="btn btn-secondary"
				disabled={ dataIsEmpty }
				type="button"
				onClick={ clearChecklist }
			>
				Clear Checklist
			</button>
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

function isDataEmpty( data: object ): boolean {
	for ( const type in data ) {
		for ( const item of data[ type ] ) {
			if ( item ) {
				return false;
			}
		}
	}
	return true;
}

function generateHardSaveData( data: object ): object | null {
	const save = localStorage.getItem( `hard-save` );
	if ( ! save ) {
		return null;
	}
	const saveData: boolean[] = save.split( `` ).map( char => char === `1` );
	const out = {};
	for ( const type in data ) {
		out[ type ] = [];
		for ( let i = 0; i < data[ type ].length; i++ ) {
			out[ type ][ i ] = saveData.shift();
		}
	}
	return out;
}

function createHardSaveString( data: object ): string {
	let out = ``;
	for ( const type in data ) {
		for ( const item of data[ type ] ) {
			out += item ? `1` : `0`;
		}
	}
	return out;
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

function generateEmptyCheckData( data: object ): object {
	const out = {};
	for ( const key in data ) {
		out[ key ] = data[ key ].map( () => false );
	}
	return out;
}

function testDataAreEqual( data1: object, data2: object ): boolean {
	for ( const type in data1 ) {
		for ( let i = 0; i < data1[ type ].length; i++ ) {
			if ( data1[ type ][ i ] !== data2[ type ][ i ] ) {
				return false;
			}
		}
	}
	return true;
}

function updateLocalStorage( list: object ): void {
	for ( const type in list ) {
		for ( let i = 0; i < list[ type ].length; i++ ) {
			saveCheck( type, i, list );
		}
	}
}

function saveCheck( type: string, index: number, list: object ): void {
	localStorage.setItem( `${ type }-${ index }`, list[ type ][ index ] ? `1` : `0` );
}

export default App;
