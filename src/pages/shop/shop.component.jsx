import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'
import {connect} from 'react-redux'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {createStructuredSelector} from 'reselect'
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors'
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({match,fetchCollectionsStart,isCollectionFetching, isCollectionsLoaded}) => {
  useEffect( () =>{
    fetchCollectionsStart();
  },[fetchCollectionsStart])

  
    
  return (
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        render={props => (<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>)} 
        //component={CollectionItem}
      />
      <Route 
        path={`${match.path}/:collectionId`} 
        render={props => (<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>)}
        //component={CollectionItem}
       />
       
    </div>
  )

}

const mapStateToProps = createStructuredSelector ({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});
      
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);