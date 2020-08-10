/**
 *
 * App
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectApp } from './selectors';
import { appSaga } from './saga';
import { AppWrapper } from './styled';
import { useRouter } from 'utils/hooks/useRouter';
import CheckNewVersion from './components/CheckNewVersion';
import { CssBaseline } from '@material-ui/core';

interface Props {}

export const App = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = useSelector(selectApp);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const { routes } = useRouter({ isLogged: true });

  return (
    <>
      <Helmet>
        <title>App</title>
        <meta name="description" content="Description of App" />
      </Helmet>
      <CheckNewVersion>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return <span>Loading</span>;
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload();
          }
          return (
            <AppWrapper>
              <CssBaseline />
              <Switch>
                <Redirect exact from="/" to="/home" />
                {routes.map(({ path, Component, props, exact }) => (
                  <Route key={path} exact={exact} path={path}>
                    {({ match }) => <Component {...props} />}
                  </Route>
                ))}
              </Switch>
            </AppWrapper>
          );
        }}
      </CheckNewVersion>
    </>
  );
});
