import React, { createRef, useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "./App.scss";

let currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function App() {
  const baseGeneral = JSON.parse(window.localStorage.getItem('general') as any ?? '{}')
  const baseExpenses = JSON.parse(window.localStorage.getItem('expenses') as any ?? '{}')

  const [expenses, setExpenses] = useState<{
    [index: string]: string;
  }>(baseExpenses);
  const [tabName, setTabName] = useState("goals");

  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");

  const [goalBalance, setGoalBalance] = useState(baseGeneral.goalBalance ?? '')
  const [goalTimeframe, setGoalTimeframe] = useState(baseGeneral.goalTimeframe ?? '')

  const expenseField = createRef<HTMLInputElement>();
  const expenseAmountField = createRef<HTMLInputElement>();

  const saveGeneral = () => {
    window.localStorage.setItem('general', JSON.stringify({
      goalBalance, goalTimeframe
    }))
  }

  const saveExpenses = (newData: any) => {
    window.localStorage.setItem('expenses', JSON.stringify(newData))
  }

  useEffect(() => {
    const onScroll = () => {
      if (document.body.scrollTop > 0.1)
        document.body.classList.add("scrolled");
      else document.body.classList.remove("scrolled");
    };

    document.body.addEventListener("scroll", onScroll);

    return () => document.body.removeEventListener("scroll", onScroll);
  });

  const focusExpenseField = () => {
    if (expenseField.current) {
      expenseField.current.focus();
    }
  };

  const focusExpenseAmountField = () => {
    if (expenseAmountField.current) {
      expenseAmountField.current.focus();
    }
  };

  // Clone the expenses data
  const getExpenses = () => Object.assign({}, expenses);

  const setExpense = (name: string, value: any) => {
    const newData = getExpenses();
    newData[name] = value;

    setExpenses(newData);
    saveExpenses(newData)
  };

  const removeExpense = (name: string) => {
    const newData = getExpenses();
    delete newData[name];

    setExpenses(newData);
  };

  return (
    <div className="App">
      <Tabs.Root value={tabName} onValueChange={(value) => setTabName(value)}>
        <Tabs.List className="appbar">
          <div>
            <section>
              <svg
                height="40"
                viewBox="0 0 1155 352"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_116_2)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M90.8387 113.548C98.6775 113.548 105.032 105.923 105.032 96.5161C105.032 87.1095 98.6775 79.4839 90.8387 79.4839C82.9998 79.4839 76.6451 87.1095 76.6451 96.5161C76.6451 105.923 82.9998 113.548 90.8387 113.548ZM79.4838 249.807C79.4838 249.807 85.1613 249.807 85.1613 232.774V161.807C85.1613 144.774 76.6451 144.774 76.6451 144.774H65.2903V136.258C65.2903 136.258 90.8387 133.419 99.3548 127.742V232.774C99.3548 249.807 105.032 249.807 105.032 249.807H110.71V264H73.8064V249.807H79.4838Z"
                    fill="#7D1416"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.4131 52.7713C17.3145 69.9004 11.3548 90.694 11.3548 105.032C11.3548 133.42 20.0426 150.863 29.1442 168.016C29.5265 168.737 29.9102 169.458 30.2943 170.18C39.1391 186.799 48.2581 203.934 48.2581 229.935V241.29C48.2581 247.561 53.3418 252.645 59.6129 252.645H68.129V264H59.6129C47.0707 264 36.9032 253.833 36.9032 241.29V229.935C36.9032 206.806 28.9644 191.871 20.0808 175.159C19.7596 174.554 19.4372 173.948 19.1139 173.339C9.76387 155.717 0 136.258 0 105.032C0 88.1448 6.81457 59.2609 21.3933 40.1964C36.1179 20.9412 58.9753 0 90.8387 0C122.702 0 145.56 20.9412 160.284 40.1964C174.863 59.2609 181.677 88.1448 181.677 105.032C181.677 136.258 171.914 155.717 162.564 173.339C162.24 173.948 161.918 174.554 161.597 175.159C152.713 191.871 144.774 206.806 144.774 229.935V241.29C144.774 253.833 134.607 264 122.065 264H116.387V252.645H122.065C128.336 252.645 133.419 247.561 133.419 241.29V229.935C133.419 203.934 142.538 186.799 151.383 170.18C151.767 169.458 152.151 168.737 152.533 168.016C161.635 150.863 170.323 133.42 170.323 105.032C170.323 90.694 164.363 69.9004 151.264 52.7713C138.311 35.833 118.588 22.7097 90.8387 22.7097C63.0892 22.7097 43.366 35.833 30.4131 52.7713Z"
                    fill="#FDCF09"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M59.0913 269.103C66.1225 267.54 76.5839 266.839 90.8392 266.839H127.742C130.878 266.839 133.42 269.38 133.42 272.516C133.42 275.652 130.878 278.193 127.742 278.193H90.8392C76.7074 278.193 67.2976 278.911 61.5544 280.187C59.7839 280.581 58.5533 280.988 57.7247 281.343C58.6464 281.959 60.1314 282.706 62.3796 283.445C68.0595 285.31 77.3241 286.71 90.8388 286.71C104.686 286.71 114.509 287.394 121.001 288.984C124.229 289.775 127.204 290.918 129.46 292.767C131.973 294.826 133.419 297.641 133.419 300.903C133.419 303.972 132.149 306.738 129.817 308.889C127.672 310.867 124.788 312.195 121.538 313.151C115.043 315.061 105.139 316.029 90.8388 316.029C77.2424 316.029 67.9447 316.781 62.097 317.939C62.6163 318.07 63.1664 318.2 63.7475 318.328C70.3645 319.786 79.8723 320.774 90.8388 320.774C102.216 320.774 111.293 321.48 117.685 323.071C120.85 323.859 123.827 324.974 126.129 326.682C128.583 328.503 130.581 331.281 130.581 334.968C130.581 338.125 129.259 341.124 126.409 343.499C123.852 345.629 120.228 347.134 115.635 348.282C106.397 350.591 90.8985 352 65.2904 352C62.1549 352 59.613 349.458 59.613 346.322C59.613 343.187 62.1549 340.645 65.2904 340.645C90.779 340.645 105.087 339.215 112.881 337.266C115.805 336.535 117.492 335.806 118.426 335.261C117.679 334.905 116.557 334.492 114.942 334.09C109.929 332.842 101.974 332.129 90.8388 332.129C79.2928 332.129 68.9296 331.097 61.3037 329.417C57.5357 328.586 54.1413 327.535 51.551 326.207C50.2657 325.548 48.896 324.68 47.777 323.51C46.6445 322.325 45.4194 320.44 45.4194 317.935C45.4194 313.974 48.0936 311.438 50.3684 310.057C52.6782 308.654 55.7088 307.68 59.1482 306.953C66.1187 305.479 76.5227 304.674 90.8388 304.674C104.925 304.674 113.473 303.687 118.333 302.257C119.84 301.814 120.804 301.381 121.4 301.041C120.77 300.743 119.786 300.377 118.3 300.013C113.247 298.776 104.618 298.064 90.8388 298.064C76.7272 298.064 66.1209 296.625 58.8364 294.233C55.2113 293.042 52.0801 291.51 49.7474 289.53C47.3912 287.53 45.4194 284.661 45.4194 281.032C45.4194 277.329 47.4244 274.515 50.0406 272.668C52.4515 270.966 55.6127 269.876 59.0913 269.103ZM119.357 334.564C119.358 334.564 119.356 334.566 119.353 334.57ZM56.641 280.406C56.6417 280.406 56.6476 280.415 56.6567 280.432C56.6447 280.415 56.6402 280.406 56.641 280.406Z"
                    fill="#343A68"
                  />
                  <path
                    d="M356 222L306 172M306 172L256 122M306 172L356 122M306 172L256 222"
                    stroke="black"
                    strokeWidth="8"
                  />
                  <path
                    d="M501.133 78.0663L428.176 245.819C424.694 253.847 420.632 263.172 412.662 266.539L408.119 268.457L451.809 268.55C449.437 266.954 447.306 265.002 446.068 262.584C444.055 258.57 446.184 253.546 447.908 249.347L460.9 218.638H546.099L553.827 236.413L559.273 249.234C560.974 253.421 563.104 258.452 561.103 262.466C559.854 264.896 557.726 266.838 555.377 268.423H599.657C596.36 264.42 592.949 260.154 593.18 253.664L593.19 108.406C593.19 105.445 592.713 100.216 596.958 99.3488C606.189 97.4633 618.117 97.3698 626.735 98.8042C634.416 100.111 638.664 102.657 643.927 107.145C648.889 111.645 652.668 116.305 655.271 122.031C656.925 126.993 658.163 131.483 658.406 137.221C658.637 145.249 655.561 151.101 651.964 157.475C647.464 165.584 640.375 171.197 632.937 175.211C627.141 177.444 620.291 179.813 615.745 180.53L738.032 337.025H763.805L763.217 334.754C760.88 333.747 758.669 332.637 756.888 330.578L643.741 188.027L644.643 187.668C650.08 185.066 654.986 181.061 659.868 176.977C681.384 158.943 687.94 126.763 669.327 104.425C664.006 98.0514 657.216 92.905 649.662 89.1225C637.192 82.98 623.01 81.7508 609.302 83.868C604.814 84.5158 600.386 85.4645 595.897 86.2279C589.813 87.2343 583.667 87.882 577.513 86.8756C574.795 86.4707 572.136 85.8684 569.545 85.5214L562.755 84.2752C566.595 87.3522 571.429 92.4297 571.429 97.6353L572.376 229.442L501.133 78.0663ZM999.662 83.9589C982.099 84.4851 965.457 93.2503 957.727 110.532C949.861 128.115 959.738 146.917 975.1 156.855C995.737 170.192 1025.96 190.865 1029.26 205.358C1031.87 216.775 1029.99 228.817 1021.65 236.66C1013.74 244.943 1005.5 250.147 993.218 250.992C984.912 251.559 977.288 251.072 969.422 249.186C963.939 247.544 959.727 244.052 954.776 241.449L954.477 241.63C954.419 250.318 954.349 261.597 954.349 271.28L955.713 270.161C958.015 268.252 960.895 267.211 963.868 267.026C971.213 266.575 978.537 268.689 985.848 268.689C1001.86 269.163 1022.18 263.487 1029.63 256.87C1029.63 256.87 1035.47 252.496 1038.61 248.598C1039.66 247.719 1044.22 241.507 1046.65 236.66C1049.78 228.991 1051.33 220.313 1051.2 211.672C1050.68 182.845 1016.18 159.441 989.58 142.667C980.776 137.115 971.627 127.885 975.861 116.919C980.049 106.103 991.063 100.062 1002.43 100.502C1009.72 100.768 1017.18 103.277 1023.57 107.395C1028.03 110.264 1032.14 113.69 1035.56 117.762L1037.79 120.436L1037.84 88.4369L1037.79 85.0614L1036.81 86.2046C1035.93 87.2341 1034.95 88.15 1033.9 89.0061C1030.94 91.4122 1026.75 89.6892 1023.43 88.3241C1015.82 85.1828 1007.64 83.7183 999.657 83.9575L999.662 83.9589ZM1046.91 85.946V112.18C1047.09 111.938 1047.26 111.65 1047.5 111.361C1048.21 110.297 1048.99 109.058 1049.92 107.809C1051.94 105.16 1055.3 104.384 1058.48 104.384H1085.53V256.987C1085.53 260.145 1082.64 263.213 1080.27 266.221L1078.27 268.566H1116.17L1114.16 266.137C1111.79 263.118 1108.9 260.18 1108.9 256.987V104.384H1135.95C1139.14 104.384 1142.5 105.159 1144.5 107.809C1145.46 109.058 1146.21 110.297 1146.93 111.361C1147.16 111.65 1147.35 111.937 1147.52 112.18V85.946H1046.91ZM704.192 85.9695L667.174 85.9929L669.416 87.3569C672.956 89.5432 675.863 92.5545 677.934 96.1639C679.646 98.9864 680.882 102.075 682.178 105.025L758.93 272.456C772.28 240.852 786.103 209.761 799.451 177.982L828.061 111.221L829.832 106.933C832.053 101.623 834.957 94.6228 838.496 92.101C840.44 90.7245 844.257 88.8825 844.997 88.8825C845.529 88.8825 847.321 91.2113 848.177 92.6455C849.31 94.6121 849.31 97.9293 849.31 100.648V251.345C849.31 255.07 847.946 258.67 845.586 261.551C843.296 264.362 840.637 267.367 839.561 268.582H947.811L947.785 240.517C946.917 242.264 944.896 246.537 942.883 248.156C940.396 250.123 936.069 250.119 932.54 250.119H872.652L872.663 186.704H917.639C918.888 186.704 921.582 187.667 923.502 189.471L927.01 192.862V160.853L924.66 163.698C923.399 165.237 921.434 166.799 919.479 166.799H872.66L872.677 104.376H930.297C935.48 104.376 941.735 104.018 944.673 108.9C945.112 109.64 945.552 110.38 945.968 111.098C946.385 111.826 946.607 112.198 946.954 112.835L947.808 114.36V85.972H804.413L806.807 88.7491C810.092 92.2425 810.626 97.5071 808.671 102.065L756.742 224.108C737.122 181.862 718.706 140.771 699.631 98.2936C697.849 94.3373 697.328 91.1925 700.995 88.3582L704.192 85.9695ZM501.116 122.425L536.295 200.108H467.531L501.116 122.425Z"
                    fill="#00264F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_116_2">
                    <rect width="1155" height="352" rx="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </section>
            <section>
              <Tabs.Trigger value="goals">Goal</Tabs.Trigger>
              <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
            </section>
            <section></section>
          </div>
        </Tabs.List>

        <main>
          <Tabs.Content value="goals">
            <div className="pageHeader">
              <div>
                <h1>My Goals</h1>
                <p>Let's get some information about how you'd like to save.</p>
              </div>
            </div>

            <form>
              <label className="readonly field">
                <label>Current balance</label>
                <div>
                  <span>$</span>
                  <input type="text" readOnly value="1,322.57" />
                </div>
              </label>
              <label className="readonly field">
                <label>Interest Rate</label>
                <div>
                  <input type="number" step="any" readOnly value="4.5" />
                  <span>%</span>
                </div>
              </label>
              <label className="field">
                <label>Balance goal</label>
                <div>
                  <span>$</span>
                  <input type="number" step=".01" required value={goalBalance} onInput={e => setGoalBalance((e.target as any).value)} />
                </div>
              </label>
              <label className="field">
                <label>I want to acheive this in...</label>
                <div>
                  <input type="number" step="any" required value={goalTimeframe} onInput={e => setGoalTimeframe((e.target as any).value)} />
                  <span>years</span>
                </div>
              </label>

              <button type="submit" className="cta button" style={{ float: 'right', marginTop: 4 }} onClick={saveGeneral}>
                <span>Save</span>
              </button>
            </form>
          </Tabs.Content>

          <Tabs.Content value="expenses">
            <div className="pageHeader">
              <div>
                <h1>My Expenses</h1>
                <p>Help us best determine your budget by putting in your monthly expenses.</p>
              </div>
            </div>

            <form
              className="addField"
              onSubmit={(e) => {
                setExpense(newExpenseName, newExpenseAmount);
                setNewExpenseName("");
                setNewExpenseAmount("");

                focusExpenseField();

                e.preventDefault();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fill="rgb(100, 100, 100)"
                  d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"
                ></path>
              </svg>

              <input
                type="text"
                placeholder="Expense"
                ref={expenseField}
                value={newExpenseName}
                required
                minLength={4}
                onInput={(e) =>
                  setNewExpenseName((e.target as HTMLInputElement).value)
                }
              />
              <span>$</span>
              <input
                type="number"
                step={0.01}
                placeholder="0.00"
                min={0.01}
                ref={expenseAmountField}
                value={newExpenseAmount}
                onInput={(e) =>
                  setNewExpenseAmount((e.target as HTMLInputElement).value)
                }
              />
              <button type="submit" className="sendButton">
                Add
              </button>
            </form>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td align="right">Amount per month</td>
                    <td width={0.1}></td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(expenses).map((name) => (
                    <tr>
                      <td>{name}</td>
                      <td align="right">{currencyFormat.format(+expenses[name])}</td>
                      <td>
                        <div className="row">
                          <button
                            className="primary iconButton"
                            onClick={() => {
                              setNewExpenseName(name);
                              setNewExpenseAmount("");
                              focusExpenseAmountField();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              width="16"
                              height="16"
                            >
                              <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                            </svg>
                          </button>
                          <button
                            className="destructive iconButton"
                            onClick={() => removeExpense(name)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              width="16"
                              height="16"
                            >
                              <path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <td className="empty" colSpan={3}>
                    <div>
                      <h2>You don't have any expenses</h2>
                      <p>
                        Expenses help you create a smarter budget using Copilot.
                      </p>

                      <button
                        className="text button"
                        onClick={focusExpenseField}
                      >
                        <span>Add an expense</span>
                      </button>
                    </div>
                  </td>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      {Object.keys(expenses).length} total
                    </td>
                    <td>
                      {currencyFormat.format(
                        Object.values(expenses).length > 0 ? Object.values(expenses)
                          .map(x => +x)
                          .reduce(
                            (reducer: number, x: number) => reducer + x
                          ) : 0
                      )} total
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </Tabs.Content>
        </main>
      </Tabs.Root>
    </div>
  );
}

export default App;
