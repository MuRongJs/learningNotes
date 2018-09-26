# Git常用 #

## 1、仓库初始化及添加文件到git仓库 ##
- 初始化一个Git仓库，使用**git init**命令。



- 添加文件到Git仓库，分两步：


	1、使用命令**git add (file)**，注意，可反复多次使用，添加多个文件；

	2、使用命令**git commit -m (message)**，完成。
- 工作区的状态，**git status**命令
- 查看修改内容，**git diff**
##2、版本回退 ##
**git reset --hard (head)/(id)**。比如:

	1、git reset --hard head^^
	2、git reset --hard head(n)
	3、git reset --hard (id)
**git log**。查看提交历史，以便确定要回退到哪个版本。
**git reflog**查看命令历史，以便确定要回到未来的哪个版本。
##3、工作区和版本库 ##
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)	

> 1、工作区与版本库结构图。
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)

	

> 2、git add把要提交的所有修改放到暂存区（Stage）。
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/0013849077337835a877df2d26742b88dd7f56a6ace3ecf000/0)

> 3、git commit就可以一次性把暂存区的所有修改提交到分支。

**如果不用git add到暂存区，那就不会加入到commit中**
##4、撤销修改 ##
1. 当你改乱了本地工作区某个文件内容时，想直接丢弃工作区的修改时，用命令**git checkout --file**
2. 当你改乱了本地工作区某文件内容并还添加到了暂存区，想要丢弃，分两步：

	用命令**git reset HEAD (file)**,返回到场景1，再按1操作
3. 已经提交了不合适的修改到版本库时，想要撤销本次提交，**参考版本回退**一节，不过前提是没有推送到远程库.
## 5、删除文件 ##
1. 如果你用的rm删除文件，也就是只是删除了工作区的文件，如果想恢复，也就是从版本库档一份，最新，删除的文件下来。**git checkout --file**(撤销)
2. 如果用的是**git rm**删除文件，就相当于删除了文件并添加到了暂存区，需要先**git reset HEAD （file）**，然后再**git checkout -- (file)**
3. 如果你想彻底把版本库的删除掉，先git rm，再git commit

## 6、远程仓库 ##
[远程仓库的概念](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001374385852170d9c7adf13c30429b9660d0eb689dd43a000)
## 7、添加远程库 ##
1、关联一个远程库，使用 **git remote add origin git@server-name:path/repo-name.git**
关联后，使用命令**git push -u origin master**来推送本地master分支内容，可以让本地master分支和远程master分支关联起来。

2、本地和远程master关联后，推送简化的命令为**git push origin master**；
## 8、从远程库克隆 ##
1、**git clone**

2018/9/25 16:36:31 

----------

# 分支管理 #
## 1、创建与合并分支 ##
1. 查看分支：**git branch**
2. 创建新分支：**git branch (name)**
3. 切换分支：**git checkout (name)**
4. 创建并切换分支：**git branch -b (name)**
5. 合并某分支到当前分支：**git merge (name)**
6. 删除分支：**git branch -d (name)**
## 解决冲突 ##
[分支有冲突](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000)