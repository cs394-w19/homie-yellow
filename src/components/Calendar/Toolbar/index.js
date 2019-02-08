import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {Button, Glyphicon, Grid, Row, Col} from 'react-bootstrap';

//import './index.scss';


export default class CalendarToolbar extends Toolbar {

	componentDidMount() {
		const view = this.props.view;
		console.log(view)
	}

	render() {
		return (

            <Grid className="toolbar-container">
                <Row>
                    <Col xs={3}>
                        <div className="rbc-btn-group">
                        <Button  variant="primary" size="sm" onClick={() => this.navigate('TODAY')}>Today</Button>
                        <Button variant="primary"  size="sm"onClick={() => this.navigate('PREV')}><Glyphicon glyph="chevron-left" /></Button>
                        <Button variant="primary" onClick={() => this.navigate('NEXT')}><Glyphicon glyph="chevron-right" /></Button>
                        </div>
                    </Col>
                    <Col xs={6}>
                    <div className="rbc-toolbar-label">{this.props.label}</div>
                    </Col>
                    <Col>
                    <Button variant="primary" size="sm" onClick={this.view.bind(null, 'week')}>Week</Button>
					<Button  variant="primary" size="sm" onClick={this.view.bind(null, 'MyWeek')}>3 Days</Button>
                     </Col>
                    
                </Row>
            </Grid>
		
		);
	}
}