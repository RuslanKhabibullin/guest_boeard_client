import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function Loader() {
  const styles = makeStyles(_ => ({
    loaderContainer: {
      position: 'fixed',
      zIndex: 100,
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: '150px 0',
      textAlign: 'center'
    }
  }))()

  return (
    <div className={styles.loaderContainer}>
      <CircularProgress />
    </div>
  )
}

export default Loader
