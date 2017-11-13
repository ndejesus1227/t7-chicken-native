import React, {Component, PropTypes} from 'react';
import {
  View,
  ListView,
  StyleSheet
} from 'react-native';

class DataList extends Component {

  fillCellsToMatchCellsPerRow(rawData, cellsPerRow) {
    const maxLength = Math.ceil( rawData.length/cellsPerRow) * cellsPerRow;
    for (let i = rawData.length; i < maxLength; i++) {
      rawData.push(null);
    }
    return rawData;
  }

  /**
   * @method createRowData
   * @param {array} rawData
   * Creates Layout Data needed to create ListView DataSource
   */
  createLayoutData(rawData = [], cellsPerRow = 1) {
    // fill rawData to match cellsPerRow so it fits grid nicely
    rawData = this.fillCellsToMatchCellsPerRow(rawData, cellsPerRow);
    const layoutData = [];
    let index = 0;
    let currentRow = [];
    for (let i = 0; i < rawData.length; i++) {
      currentRow.push(rawData[i]);
      if (currentRow.length === cellsPerRow || i === rawData.length - 1) {

        layoutData.push({ index, cells: currentRow });
        currentRow = [];
        index++;
      }
    }
    return layoutData;
  }

  /**
   * @method formatDataSource
   * @param {array} layoutData
   * Creates DataSource formatted for ListView comp
   */
  formatDataSource(layoutData = []) {
    const fd = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !==r2});
    // let dataSource = fd.cloneWithRows([this.renderFrameData(this.frameDataFilter)]);
    let dataSource = fd.cloneWithRows(layoutData);
    return dataSource;
  }

  /**
   * @method _renderRow
   * @param {object} rowData
   * @param {component} cellComponent
   * @param {style obj/enum} rowStyle
   * @param {style obj/enum} cellStyle
   * @param {function} onCellPress
   * Rendering function used to create a row for the list
   * renders the cell in row as cellComponent given
   */
  _renderRow(rowData, CellComponent, rowStyle, cellStyle, onCellPress, navigation) {
    // will need to add param for using rowComponent
    return (
      <View style={[styles.row, rowStyle]}>
        {
          rowData.cells.map((cell, i) => {
            return (
              <View style={[styles.cell, cellStyle]} key={i}>
                <CellComponent {...cell} onPressHandler={onCellPress} navigation={navigation} />
              </View>
            );
          })
        }
      </View>
    );
  }

  render() {
    const {
      mainStyle, containerStyle, rowStyle, cellStyle,
      cellComponent, listData, cellsPerRow, onCellPress, navigation
    } = this.props;
    // data source creation
    const dataSource = this.formatDataSource( this.createLayoutData(listData, cellsPerRow) );
    return(
      <ListView
        enableEmptySections={true}
        style={mainStyle}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={[styles.container, containerStyle]}
        dataSource={dataSource}
        renderRow={(rowData) => this._renderRow(rowData, cellComponent, rowStyle, cellStyle, onCellPress, navigation)}
      />
    );
  }
}

// Initial Styles
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%'
    // justifyContent: 'space-between'
  },
  cell: {
    flex: 1,
    flexGrow: 1,
    flexBasis: 0
  }
});

DataList.propTypes = {
  listData: PropTypes.array,
  cellComponent: PropTypes.func, // component
  cellsPerRow: PropTypes.number,
  onCellPress: PropTypes.func,
  /*
    Stylesheet Properties
    (comes as number or array when passed, so it can't be specified)

    Props:              Description:
    -----               ------------
    mainStyle           List base style
    containerStyle      List Row Container style
    rowStyle            List Row styling
    cellStyle           List Cell style
  */
};


export default DataList;
