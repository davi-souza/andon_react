import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';

import AppBarCentral from '../../../components/Appbar/AppBarCentral';
import Container from '../../../components/Grid/Container';
import DashboardPaper from "../../../components/Paper/DashboardPaper";
import SimpleTable from "../../../components/Table/SimpleTable";

import CentralContext from '../../../contexts/CentralContext';

import { kpiWarningNumberByReason, kpiWarningNumberByPlace,
  kpiIntermediateNumberOfResolvedWarnings, kpiIntermediateAverageResolutionTime,
  kpiNumberOfOpenWarnings, kpiAverageResolutionTime, kpiNumberOfWarningsByType } from "../../../fetch/andon/central/dashboard";

class AndonCentralDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfWarningsByType: [],
      loadingNumberOfWarningsByType: false,

      numberOfOpenWarnings: 0,
      loadingNumberOfOpenWarnings: false,

      averageResolutionTime: 0,
      loadingAverageResolutionTime: false,

      intermediateNumberOfResolvedWarnings: [],
      loadingIntermediateNumberOfResolvedWarnings: false,

      intermediateAverageResolutionTime: [],
      loadingIntermediateAverageResolutionTime: false,

      warningNumberByReason: [],
      loadingWarningNumberByReason: false,

      warningNumberByPlace: [],
      loadingWarningNumberByPlace: false,

      handleChange: (name,value) => {
        this.setState({
          [name]: value,
        });
      }
    };
  }

  componentWillMount() {
    this.handleFetchKpis();
  }

  render() {
    console.log(this.state.warningNumberByPlace);
    return (
      <CentralContext.Consumer>
        { central =>
          <div>
            <AppBarCentral />
            <Container appbarFixed fullPage>
              <Grid container spacing={8} className="margin-bottom-8">
                <Grid item xs={12} sm={3} lg={3}>
                  <DashboardPaper className="txt-align-center" padding={1} header="Número de avisos NÃO resolvidos">
                    {this.state.numberOfOpenWarnings}
                  </DashboardPaper>
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                  <DashboardPaper className="txt-align-center" padding={1} header="Número TOTAL de ALERTA">
                    {this.state.numberOfWarningsByType.length === 2 && this.state.numberOfWarningsByType[0].qty}
                  </DashboardPaper>
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                  <DashboardPaper className="txt-align-center" padding={1} header="Número TOTAL de PARADO">
                    {this.state.numberOfWarningsByType.length === 2 && this.state.numberOfWarningsByType[1].qty}
                  </DashboardPaper>
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <DashboardPaper className="txt-align-center" padding={1} header="Tempo média de parada">
                    {this.state.averageResolutionTime}
                  </DashboardPaper>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <SimpleTable
                    title="Avisos por MOTIVO"
                    data={this.state.warningNumberByReason.map(warningByReason => (
                      {
                        "Motivo": warningByReason.name,
                        "Quantidade": warningByReason.warningsQty,
                      }
                    ))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <SimpleTable
                    title="Avisos por LOCAL"
                    data={this.state.warningNumberByPlace.map(warningByPlace => (
                      {
                        "Local": warningByPlace.name,
                        "Quantidade": warningByPlace.warningsQty,
                      }
                    ))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <SimpleTable
                    title="Avisos RESOLVIDOS por FUNCIONÁRIO"
                    data={this.state.intermediateNumberOfResolvedWarnings.map(intermediate => (
                      {
                        "Nome do funcionário": `${intermediate.firstname} ${intermediate.lastname}`,
                        "Avisos resolvidos": intermediate.resolvedWarningsQty,
                      }
                    ))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <SimpleTable
                    title="Tempo MÉDIO de resolução por FUNCIONÁRIO"
                    data={this.state.intermediateAverageResolutionTime.map(intermediate => (
                      {
                        "Nome do funcionário": `${intermediate.firstname} ${intermediate.lastname}`,
                        "Tempo médio de resolução": `${this.handleCalculateAverageTime(intermediate.resolvedWarningsAverageTime)}`,
                      }
                    ))}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        }
      </CentralContext.Consumer>
    );
  }

  handleFetchKpis = () => {
    this.handleGetNumberOfWarningsByType();
    this.handleGetNumberOfOpenWarnings();
    this.handleGetAverageResolutionTime();

    this.handeGetIntermediatesNumberOfResolvedWarnings();
    this.handeGetIntermediatesAverageResolutionTime();

    this.handleGetWarningNumberByReason();
    this.handleGetWarningNumberByPlace();
  }

  handleGetNumberOfWarningsByType = async () => {
    this.state.handleChange("loadingNumberOfWarningsByType",true);
    this.state.handleChange("numberOfWarningsByType", await kpiNumberOfWarningsByType());
    this.state.handleChange("loadingNumberOfWarningsByType",false);
  }

  handleGetNumberOfOpenWarnings = async () => {
    this.state.handleChange("loadingNumberOfOpenWarnings",true);
    this.state.handleChange("numberOfOpenWarnings", await kpiNumberOfOpenWarnings());
    this.state.handleChange("loadingNumberOfOpenWarnings",false);
  }

  handleGetAverageResolutionTime = async () => {
    this.state.handleChange("loadingAverageResolutionTime",true);
    this.state.handleChange("averageResolutionTime", await kpiAverageResolutionTime());
    this.state.handleChange("loadingAverageResolutionTime",false);
  }

  handeGetIntermediatesNumberOfResolvedWarnings = async () => {
    this.state.handleChange("loadingIntermediateNumberOfResolvedWarnings",true);
    this.state.handleChange("intermediateNumberOfResolvedWarnings", await kpiIntermediateNumberOfResolvedWarnings());
    this.state.handleChange("loadingIntermediateNumberOfResolvedWarnings",false);
  }

  handeGetIntermediatesAverageResolutionTime = async () => {
    this.state.handleChange("loadingIntermediateAverageResolutionTime",true);
    this.state.handleChange("intermediateAverageResolutionTime", await kpiIntermediateAverageResolutionTime());
    this.state.handleChange("loadingIntermediateAverageResolutionTime",false);
  }

  handleGetWarningNumberByReason = async () => {
    this.state.handleChange("loadingWarningNumberByReason",true);
    this.state.handleChange("warningNumberByReason", await kpiWarningNumberByReason());
    this.state.handleChange("loadingWarningNumberByReason",false);
  }

  handleGetWarningNumberByPlace = async () => {
    this.state.handleChange("loadingWarningNumberByPlace",true);
    this.state.handleChange("warningNumberByPlace", await kpiWarningNumberByPlace());
    this.state.handleChange("loadingWarningNumberByPlace",false);
  }

  handleCalculateAverageTime = (time) => {
    let label = "segundo";
    if(time >= 60) {
      time /= 60;
      label = "minuto";
    }
    if(time >= 60) {
      time /= 60;
      label = "hora";
    }
    return `${time.toFixed(2)} ${label}(s)`
  }
}

export default AndonCentralDashboard;