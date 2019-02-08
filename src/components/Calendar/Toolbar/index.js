import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {Button, Glyphicon, Grid, Row, Col} from 'react-bootstrap';

import './index.scss';


export default class CalendarToolbar extends Toolbar {

	componentDidMount() {
		const view = this.props.view;
		console.log(view)
	}

	render() {
		return (
			<div>
				<Row>
					<Col xs={6} md={6}>
					<h4>{this.props.label}</h4>
					</Col>
				</Row>
        <Row>
            <Col xs={6} md={6}>
                <div className="rbc-btn-group">
                <Button  variant="primary" size="xs" onClick={() => this.navigate('TODAY')}>Today</Button>
                <Button variant="primary"  size="xs"onClick={() => this.navigate('PREV')}><Glyphicon glyph="chevron-left" /></Button>
                <Button variant="primary" onClick={() => this.navigate('NEXT')}><Glyphicon glyph="chevron-right" /></Button>
                </div>
            </Col>
            <Col xs={6} md={6}>
							<Button className="pull-right" variant="primary" size="xs" onClick={this.view.bind(null, 'week')}>Week</Button>
							<Button className="pull-right" variant="primary" size="xs" onClick={this.view.bind(null, 'MyWeek')}>3 Days</Button>
							<Button className="pull-right" variant="primary" size="xs" onClick={this.view.bind(null, 'day')}>Day</Button>

            </Col>
        </Row>
				<Row id="horz-spacing"/>
			</div>
		);
	}
}
