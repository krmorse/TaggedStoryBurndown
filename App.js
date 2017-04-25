Ext.define('TaggedStoryBurndownApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    launch: function() {
        this.add([{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'rallytagcombobox',
                itemId: 'tagCombo',
                fieldLabel: 'Tag:',
                labelWidth: 30,
                listeners: {
                    select: this._onSelect,
                    scope: this
                },
                width: 200
            },
            {
                xtype: 'rallydatefield',
                itemId: 'startDate',
                fieldLabel: 'Start Date',
                value: Rally.util.DateTime.add(new Date(), 'month', -3),
                listeners: {
                    select: this._onSelect,
                    scope: this
                },
                margin: '0 0 0 50px',
                labelWidth: 65,
                width: 200
            }]
        },
        {
            xtype: 'container',
            itemId: 'reportContainer',
            flex: 1
        }
        ]);
    },


    _onSelect: function() {
        if (this.down('rallystandardreport')) {
            this.down('rallystandardreport').destroy();
        }

        this._addChart();
    },

    _addChart: function() {
        var tag = this.down('#tagCombo').getRecord(),
            startDate = this.down('#startDate').getValue();

        if (tag && startDate) {
            var reportContainer = this.down('#reportContainer');
            reportContainer.add({
                xtype: 'rallystandardreport',
                width: reportContainer.getWidth(),
                height: reportContainer.getHeight(),
                reportConfig: {
                    report: Rally.ui.report.StandardReport.Reports.TaggedStoryBurndown,
                    tag: tag.get('Name'),
                    start_date: Rally.util.DateTime.format(startDate, 'd-M-Y')
                }
            });
        }
    }
});