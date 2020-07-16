<template>
  <sui-segment>
    <sui-container>
      <sui-table celled striped>
        <sui-table-header>
          <sui-table-row>
            <sui-table-headerCell colspan="5">API:</sui-table-headerCell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row>
            <sui-table-cell collapsing>
              <sui-icon name="folder" />/api/getHistoryBikes
            </sui-table-cell>
            <sui-table-cell>
              <sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="3">query</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                  <sui-table-row>
                    <sui-table-cell collapsing>email</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | Required</sui-table-cell>
                    <sui-table-cell>Find stolen bike by email</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>bearer</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | Required</sui-table-cell>
                    <sui-table-cell>Find stolen bike by bearer</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>mode</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | served OR history</sui-table-cell>
                    <sui-table-cell>
                      Find stolen bike by mode query:
                      <br />
                      <b>served</b>- is currently observing stolen bike
                      <br />
                      <b>history</b>- get information about all stolen bikes
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell>
            <sui-table-cell collapsing text-align="right">method: GET</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>
              <sui-icon name="folder" />/api/getStolenBikes
            </sui-table-cell>
            <sui-table-cell>
              <sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="3">query</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                  <sui-table-row>
                    <sui-table-cell collapsing>email</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | Required</sui-table-cell>
                    <sui-table-cell>Find stolen bike by email</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>passport_number</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | Required</sui-table-cell>
                    <sui-table-cell>Find stolen bike by Passport Number</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>serial_number</sui-table-cell>
                    <sui-table-cell>type: &#60Number&#62; | Required</sui-table-cell>
                    <sui-table-cell>Find stolen bike by Serial Number</sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell>
            <sui-table-cell text-align="right">method: GET</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>
              <sui-icon name="folder" />/api/createBikeUser
            </sui-table-cell>
            <sui-table-cell>
              <sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="2">body</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                  <sui-table-row>
                    <sui-table-cell collapsing>owner</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>address</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>phone_number</sui-table-cell>
                    <sui-table-cell>type: &#60Number&#62; | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell>email </sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | Required </sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell>passport_number</sui-table-cell>
                    <sui-table-cell>type: &#60Number&#62; | Required</sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell>
            <sui-table-cell text-align="right">method: POST</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>/api/fillOutStolenBikes</sui-table-cell>
            <sui-table-cell>
              <sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="2">query</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                  <sui-table-row>
                    <sui-table-cell collapsing>name_bike</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>model_bike</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>serial_number</sui-table-cell>
                    <sui-table-cell>type: &#60Number&#62; | Required </sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell>passport_number</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the user | Required</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell positive>email</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the user | Required </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell>
            <sui-table-cell text-align="right">method: POST | PUT</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>/api/createPoliceQuery</sui-table-cell>
            <sui-table-cell><sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="2">body</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                
                  <sui-table-row positive>
                    <sui-table-cell positive>email</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the policer | Required </sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell positive>bearer</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the policer | Required </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell>
            <sui-table-cell text-align="right">method: POST | PUT</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>/api/resolveStolenBike</sui-table-cell>
            <sui-table-cell><sui-table celled striped>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-headerCell colspan="3">body</sui-table-headerCell>
                  </sui-table-row>
                </sui-table-header>

                <sui-table-body>
               <sui-table-row positive>
                    <sui-table-cell positive>email</sui-table-cell>

                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the policer | Required </sui-table-cell>
                   <sui-table-cell></sui-table-cell>
                  </sui-table-row>
                  <sui-table-row positive>
                    <sui-table-cell positive>bearer</sui-table-cell>
                    <sui-table-cell>type: &#60Any&#62; | This field is required to store a new bike and bind it accurately to the policer | Required </sui-table-cell>
                   <sui-table-cell></sui-table-cell>
                  </sui-table-row>
                    <sui-table-row positive>
                    <sui-table-cell positive>operation</sui-table-cell>
                    <sui-table-cell>type: &#60String&#62; | This method will be resolved all of the required bikes, database will be up to date without any queues </sui-table-cell>
                   <sui-table-cell positive>Available methods: <br /> APPROVEN | DENIED | SUSPECTED </sui-table-cell>
                  
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-table-cell></sui-table-cell>
            <sui-table-cell text-align="right">method: POST | PUT</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
  </sui-segment>
</template>

<script>
export default {};
</script>

<style>
</style>