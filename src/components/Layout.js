import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default ({ children }) => (
    <React.Fragment>
        <NavMenu/>
        <Container>
            {children}
        </Container>
    </React.Fragment>
);
