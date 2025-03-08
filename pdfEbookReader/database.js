import * as sql from "expo-sqlite/legacy"


const db = sql.openDatabase('mydatabase.db');

export function wipeDatabase() { 
 
    db.transaction(tx => {
        tx.executeSql(
            `Drop TABLE Books
            `,
            [],)
    })}
    

export const createBooks = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Books (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              bookColour TEXT,
              filePath TEXT,
              fileThumbnail TEXT,
              pageNumber INTEGER,
              favourite INT
            );`,
            [],
            () => {
              console.log('Books table created successfully.');
              resolve();
            },
            (_, error) => {
              console.error('Error creating Books table:', error);
              reject(error);
            }
          );
        });
      });
    };

export const insertIntoBooks = async (title,bookColour,filePath,fileThumbnail) => {
    try {
        if (db) {
            const InDatabase = await checkForDuplicateFile(title)
            console.log("IsItDuplicate",InDatabase)
            if (!InDatabase) {
                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO Books (title,bookColour,filePath,fileThumbnail,pageNumber,favourite) VALUES(?,?,?,?,?,?)`, [title, bookColour, filePath, fileThumbnail, 1, 0]);
                });
             
                console.log("INSERT INTO Books successfully", title, bookColour, filePath, fileThumbnail);
            } else { 
                return false
            }
        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
};

export const updatePageInBooks = async (bookID,pageNumber) => {
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`UPDATE Books SET pageNumber=? WHERE id=?`,[pageNumber,bookID]);
            });

            console.log("Updated pageNumber in Books successfully",pageNumber);
        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
};


export const updateTitleInBooks = async (bookID,title) => {
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`UPDATE Books SET title=? WHERE id=?`,[title,bookID]);
            });

            console.log("Updated title in Books successfully",title);
        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
};

export const updateFavouriteInBooks = async (bookID,isFavourite) => {
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`UPDATE Books SET favourite=? WHERE id=?`,[isFavourite,bookID]);
            });

            console.log("Updated favourite in Books successfully",isFavourite);
        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
};

export const getBookCurrentPage = async (bookID) => {
    return new Promise((resolve, reject) => { 
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`SELECT pageNumber FROM Books WHERE id=?`, [bookID],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            // Resolve the promise with the currentPage value
                            console.log(`current page ${result.rows.item(0).currentPage}`)
                            resolve(result.rows.item(0).pageNumber);
                        } else {
                            reject("No book found with the given ID.");
                        }
                    }, (error)=>{ 
                       reject("Error retriving currentPage",error)
                    }
                    );
            });

        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
});
}


export const getFavouriteStatus = async (bookID) => {
    return new Promise((resolve, reject) => { 
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`SELECT favourite FROM Books WHERE id=?`, [bookID],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            // Resolve the promise with the currentPage value
                            console.log(`Favourite Status:${result.rows.item(0).favourite}`)
                            resolve(result.rows.item(0).favourite);
                        } else {
                            reject("No book found with the given ID.");
                        }
                    }, (error)=>{ 
                       reject("Error retriving favourite",error)
                    }
                    );
            });

        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
});
}

export const deleteFromBook = async (bookID) => {
    return new Promise((resolve, reject) => { 
    try {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(`DELETE FROM Books WHERE id=?
                `, [bookID],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            console.log(`Deleted book with ID: ${bookID}`);
                            resolve();
                        } else {
                            reject("No book found with the given ID.");
                        }
                    }, (error)=>{ 
                       reject(error)
                    }
                    );
            });

         
        } else {
            console.error("Database not initialized.");
        }
    } catch (error) {
        console.error("Failed to create tables:", error);
    }
});
}

export const getBookData = async () => {
    return new Promise((resolve, reject) => {
      try {
        if (db) {
          console.log('Database is initialized');
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Books`, // Ensure the query is correct
              [],
              (_, result) => {
                if (result.rows.length > 0) {
                  const rows = [];
                  for (let i = 0; i < result.rows.length; i++) {
                    rows.push(result.rows.item(i));
                  }
                  console.log("Books data successfully retrieved", rows);
                  resolve(rows||[]);
                } else {
                  console.log('No books found in the database');
                  resolve([]); // Resolve with an empty array if no books are found
                }
              },
              (error) => {
                console.error('Error executing SQL query:', error);
                  reject(error);
                  return true
              }
            );
          });
        } else {
          console.error("Database not initialized.");
          reject("Database not initialized.");
        }
      } catch (error) {
        console.error("Failed to get book data:", error);
        reject(error); // Reject with the error to handle it properly in the calling function
      }
    });
};
 
const checkForDuplicateFile = (title) => {
    return new Promise((resolve, reject) => {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM Books WHERE title = ?`,
                    [title],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            resolve(true)
                        } else { 
                            console.log("results",result.rows.length > 0)
                            resolve(false)
                        }
                    },
                    (_, error) => {
                        console.error('Error checking for duplicate file:', error);
                        reject(error); // Reject on error
                    }
                );
            });
        } else {
            resolve(false); // If database is not initialized, assume no duplicates
        }
    });
};

