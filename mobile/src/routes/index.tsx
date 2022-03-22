import React, {useContext} from 'react';

import { View, ActivityIndicator } from 'react-native';

import {AuthContext} from '../contexts/AuthContext';

import AppRoutes from './app.routes';
import AuhtRoutes from './auth.routes';

function Routes(){
    
    const { isAuthenticated, loading } = useContext(AuthContext) ;

    if(loading){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#1d1d2e',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator 
                    size={60}
                    color="#f5f7fb"
                />
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes /> : <AuhtRoutes />
    )
}

export default Routes;