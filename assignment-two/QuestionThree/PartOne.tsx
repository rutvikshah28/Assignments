/*
    // Part 1 - React
    // To go to the original file, please go to heyauto/packages/ha-admin/src/analytics/views/RunningAnalytics.tsx
    // I have extracted repeating data into a function and have used partial application to handle cases.
    // This also ends up with the JSX being a lot more readable.
*/

import { Divider, Grid, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@vividtheory/ha-ui";
import {
    RunningAnalyticsGrouped,
    RunningCountsType,
} from "@vividtheory/yd-backend";
import React from "react";

import RunningAnalyticsChart from "./RunningAnalyticsChart";
import SingleRunningAnalytic from "./SingleRunningAnalytic";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        countCtn: {
            marginTop: theme.spacing(5),
        },
        divider: {
            width: "100%",
            backgroundColor: theme.palette.secondary.dark,
        },
        chartCtn: {
            marginTop: theme.spacing(5),
        },
    })
);
const RunningAnalytics = ({
    runningAnalytics,
    limited,
    openTour,
}: {
    readonly runningAnalytics?: RunningAnalyticsGrouped;
    readonly limited: boolean;
    readonly openTour: () => void;
}) => {
    const classes = useStyles();
    const currentVehicle = runningAnalytics?.vehicles[0];
    const currentUser = runningAnalytics?.users[0];
    const currentLeads = runningAnalytics?.leads[0];
    const currentOneTimeLeads = runningAnalytics?.oneTimeLeads[0];
    const currentCallLeads = runningAnalytics?.callLeads[0];
    const currentDealerships = runningAnalytics?.dealerships[0];
    const currentSrpVehicleViews = runningAnalytics?.srpVehicleViews[0];
    const currentVdpVehicleViews = runningAnalytics?.vdpVehicleViews[0];

    const returnAnalytic =
        (limited?: boolean) => (analytic: any, type: string) => {
            if (limited !== undefined) {
                return (
                    !limited && (
                        <SingleRunningAnalytic
                            type={type}
                            count={analytic?.count}
                            difference={analytic?.difference}
                            date={
                                analytic ? new Date(analytic.date) : new Date()
                            }
                        />
                    )
                );
            } else {
                return (
                    <SingleRunningAnalytic
                        type={type}
                        count={analytic?.count}
                        difference={analytic?.difference}
                        date={analytic ? new Date(analytic.date) : new Date()}
                    />
                );
            }
        };

    return (
        <Grid direction="column" data-tut="marketing-analytics-root">
            <Grid container justifyContent="space-between">
                <Typography variant="h5">Analytics</Typography>
                <Button
                    id="admin-btn-set_RunningAnalytics-learn-more"
                    onClick={openTour}
                    color="info"
                >
                    Learn More
                </Button>
            </Grid>
            <Grid container className={classes.countCtn}>
                {returnAnalytic(limited)(
                    currentVehicle,
                    RunningCountsType.vehicles
                )}
                {returnAnalytic()(currentUser, RunningCountsType.users)}
                {returnAnalytic()(currentLeads, RunningCountsType.leads)}
                {returnAnalytic()(
                    currentOneTimeLeads,
                    RunningCountsType.oneTimeLeads
                )}
                {returnAnalytic()(
                    currentCallLeads,
                    RunningCountsType.callLeads
                )}
                {returnAnalytic(limited)(
                    currentDealerships,
                    RunningCountsType.dealerships
                )}
                {!limited && (
                    <>
                        {returnAnalytic()(
                            currentSrpVehicleViews,
                            RunningCountsType.srpVehicleViews
                        )}
                        {returnAnalytic()(
                            currentVdpVehicleViews,
                            RunningCountsType.vdpVehicleViews
                        )}
                    </>
                )}
            </Grid>
            <Grid container className={classes.chartCtn}>
                {runningAnalytics ? (
                    <>
                        <Divider className={classes.divider} />
                        <RunningAnalyticsChart
                            val={runningAnalytics.users.slice().reverse()}
                            label="Users"
                            data-tut="marketing-analytics-users"
                        />
                        <Divider className={classes.divider} />
                        <RunningAnalyticsChart
                            val={runningAnalytics.leads.slice().reverse()}
                            label="Leads"
                            data-tut="marketing-analytics-leads"
                        />
                        <Divider className={classes.divider} />
                        <RunningAnalyticsChart
                            val={runningAnalytics.oneTimeLeads
                                .slice()
                                .reverse()}
                            label="One Time Leads"
                            data-tut="marketing-analytics-one-time"
                        />
                        <Divider className={classes.divider} />
                        <RunningAnalyticsChart
                            val={runningAnalytics.callLeads.slice().reverse()}
                            label="Call Leads"
                            data-tut="marketing-analytics-calls"
                        />
                        {!limited && (
                            <>
                                <Divider className={classes.divider} />
                                <RunningAnalyticsChart
                                    val={runningAnalytics.vehicles
                                        .slice()
                                        .reverse()}
                                    label="Vehicles"
                                />
                                <Divider className={classes.divider} />
                                <RunningAnalyticsChart
                                    val={runningAnalytics.dealerships
                                        .slice()
                                        .reverse()}
                                    label="Dealership"
                                />
                                <Divider className={classes.divider} />
                                <RunningAnalyticsChart
                                    val={runningAnalytics.srpVehicleViews
                                        .slice()
                                        .reverse()}
                                    label="SRP Vehicle Views"
                                />
                                <Divider className={classes.divider} />
                                <RunningAnalyticsChart
                                    val={runningAnalytics.vdpVehicleViews
                                        .slice()
                                        .reverse()}
                                    label="VDP Vehicle Views"
                                />
                            </>
                        )}
                        <Divider className={classes.divider} />
                    </>
                ) : null}
            </Grid>
        </Grid>
    );
};
export default RunningAnalytics;
